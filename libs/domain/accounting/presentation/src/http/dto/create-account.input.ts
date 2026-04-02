import { InputType, Field } from '@nestjs/graphql';
import { AccountType, CreateAccountDto } from '@virtex/domain-accounting-contracts';

@InputType()
export class CreateAccountInput extends CreateAccountDto {
  @Field()
  declare code: string;

  @Field()
  declare name: string;

  @Field(() => AccountType)
  declare type: AccountType;

  @Field({ nullable: true })
  declare parentId?: string;
}
