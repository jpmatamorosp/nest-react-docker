import { applyDecorators, Type } from "@nestjs/common";
import { ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginatedDto } from "../dtos/paginated.dto";

export const ApiPaginatedResponse = <TModel extends Type<any>>(
    model: TModel,
) => {
    return applyDecorators(
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PaginatedDto) },
                    {
                        properties: {
                            limit: { type: 'number' },
                            offset: { type: 'number' },
                            results: {
                                type: 'array',
                                items: { $ref: getSchemaPath(model) },
                            },
                            total: { type: 'number' }
                        },
                    },
                ],
            },
        }),
    );
};