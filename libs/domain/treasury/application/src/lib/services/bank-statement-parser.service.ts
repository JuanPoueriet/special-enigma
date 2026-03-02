import { Injectable } from '@nestjs/common';

export interface StatementLine {
  date: Date;
  amount: number;
  description: string;
  reference?: string;
}

@Injectable()
export class BankStatementParser {
  parseCsv(content: string): StatementLine[] {
    const lines = content.split('\n').filter(l => l.trim().length > 0);
    // Assuming format: date,amount,description,reference
    return lines.map(line => {
      const parts = line.split(',');
      return {
        date: new Date(parts[0]),
        amount: parseFloat(parts[1]),
        description: parts[2],
        reference: parts[3]
      };
    });
  }

  parseOfx(content: string): StatementLine[] {
     // Simplified OFX parsing logic for POC
     const regex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/g;
     const lines: StatementLine[] = [];
     let match;

     while ((match = regex.exec(content)) !== null) {
        const trn = match[1];
        const dateMatch = trn.match(/<DTPOSTED>(\d{8})/);
        const amountMatch = trn.match(/<TRNAMT>([-.\d]+)/);
        const nameMatch = trn.match(/<NAME>([^<]+)/);
        const refMatch = trn.match(/<FITID>([^<]+)/);

        if (dateMatch && amountMatch) {
            const dateStr = dateMatch[1];
            const date = new Date(`${dateStr.substring(0,4)}-${dateStr.substring(4,6)}-${dateStr.substring(6,8)}`);
            lines.push({
                date,
                amount: parseFloat(amountMatch[1]),
                description: nameMatch ? nameMatch[1].trim() : '',
                reference: refMatch ? refMatch[1].trim() : undefined
            });
        }
     }
     return lines;
  }
}
