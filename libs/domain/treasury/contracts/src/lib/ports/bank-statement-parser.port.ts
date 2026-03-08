export interface StatementLine {
    date: Date;
    amount: number;
    description: string;
    reference?: string;
}

export interface ParserResult {
    lines: StatementLine[];
    metadata: Record<string, any>;
}

export const BANK_STATEMENT_PARSER = 'BANK_STATEMENT_PARSER';

export interface BankStatementParser {
    parse(content: Buffer | string): Promise<ParserResult>;
    supports(filename: string): boolean;
}
