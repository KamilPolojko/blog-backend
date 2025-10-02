import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateArticleDto {
  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  articleId: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  content: string;

  @ApiProperty({
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Categories array',
    type: 'array',
    items: { type: 'string' },
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return value;
  })
  @IsArray()
  @IsString({ each: true })
  categories?: string[];

  @ApiProperty({
    description: 'Is article active',
    default: 'true',
  })
  @IsOptional()
  @IsString()
  isActive?: string;

  @ApiProperty({
    description: 'Estimated reading time',
    default: '5',
  })
  @IsOptional()
  @IsString()
  readingTime?: string;

  @ApiProperty({
    example: '2025-09-10T14:23:00.000Z',
    description: 'Created date of article',
  })
  @IsOptional()
  @IsString()
  createdAt?: string;
}
