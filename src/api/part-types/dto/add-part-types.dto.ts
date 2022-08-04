import { ApiProperty } from '@nestjs/swagger';

export class AddPartTypesDto {
  @ApiProperty()
  name: string;
}
