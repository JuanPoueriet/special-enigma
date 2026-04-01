import { Injectable, Logger } from '@nestjs/common';
import { StoragePort } from '../ports/storage.port';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3StorageAdapter extends StoragePort {
  private readonly logger = new Logger(S3StorageAdapter.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    super();
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    this.bucketName = this.configService.getOrThrow<string>('AWS_S3_BUCKET');

    if (!accessKeyId || !secretAccessKey) {
      this.logger.warn('AWS credentials not found, S3StorageAdapter may fail if used.');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    });
  }

  async saveFile(fileName: string, buffer: Buffer): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
      });
      await this.s3Client.send(command);
      return fileName;
    } catch (error) {
      this.logger.error(`Failed to upload file ${fileName} to S3`, error);
      throw error;
    }
  }

  getFileUrl(fileName: string): string {
    // Return a signed URL or public URL depending on configuration.
    // For now, assuming public read or handled by CloudFront/CDN.
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${fileName}`;
  }

  async countFilesByPrefix(prefix: string): Promise<number> {
    // Ensure prefix ends with a delimiter to avoid collisions (e.g., user "1" matching "10")
    const searchPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`;
    let count = 0;
    let continuationToken: string | undefined;

    try {
      do {
        const command: ListObjectsV2Command = new ListObjectsV2Command({
          Bucket: this.bucketName,
          Prefix: searchPrefix,
          ContinuationToken: continuationToken,
        });
        const response = await this.s3Client.send(command);
        count += response.KeyCount || 0;
        continuationToken = response.NextContinuationToken;
      } while (continuationToken);

      return count;
    } catch (error) {
      this.logger.error(`Failed to count files with prefix ${searchPrefix} in S3`, error);
      return 0;
    }
  }
}
