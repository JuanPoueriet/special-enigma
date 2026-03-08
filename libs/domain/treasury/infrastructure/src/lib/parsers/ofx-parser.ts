import { BankStatementParser, ParserResult, StatementLine } from '../../../../contracts/src/lib/ports/bank-statement-parser.port';

export class OfxBankStatementParser implements BankStatementParser {
    supports(filename: string): boolean {
        return filename.toLowerCase().endsWith('.ofx');
    }

    async parse(content: Buffer | string): Promise<ParserResult> {
        // TODO: Implement actual OFX parsing logic.
        // This is a stub to allow the application to serve as requested.
        return {
            lines: [],
            metadata: { format: 'OFX' }
        };
    }
}
