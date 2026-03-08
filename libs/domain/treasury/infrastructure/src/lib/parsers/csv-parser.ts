import { BankStatementParser, ParserResult, StatementLine } from '../../../../contracts/src/lib/ports/bank-statement-parser.port';

export class CsvBankStatementParser implements BankStatementParser {
    supports(filename: string): boolean {
        return filename.toLowerCase().endsWith('.csv');
    }

    async parse(content: Buffer | string): Promise<ParserResult> {
        const text = content.toString();
        const rows = text.split('\n').map(r => r.trim()).filter(r => r.length > 0);

        const startIndex = rows[0]?.toLowerCase().includes('date') ? 1 : 0;

        const lines: StatementLine[] = rows.slice(startIndex).map(row => {
            const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));
            return {
                date: new Date(cols[0]),
                amount: parseFloat(cols[1]),
                description: cols[2] || '',
                reference: cols[3] || undefined
            };
        }).filter(l => !isNaN(l.amount));

        return {
            lines,
            metadata: {
                format: 'CSV',
                rowCount: lines.length
            }
        };
    }
}
