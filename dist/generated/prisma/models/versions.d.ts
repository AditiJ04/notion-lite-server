import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model versions
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type versionsModel = runtime.Types.Result.DefaultSelection<Prisma.$versionsPayload>;
export type AggregateVersions = {
    _count: VersionsCountAggregateOutputType | null;
    _min: VersionsMinAggregateOutputType | null;
    _max: VersionsMaxAggregateOutputType | null;
};
export type VersionsMinAggregateOutputType = {
    id: string | null;
    document_id: string | null;
    created_by: string | null;
    created_at: Date | null;
};
export type VersionsMaxAggregateOutputType = {
    id: string | null;
    document_id: string | null;
    created_by: string | null;
    created_at: Date | null;
};
export type VersionsCountAggregateOutputType = {
    id: number;
    document_id: number;
    content_snapshot: number;
    created_by: number;
    created_at: number;
    _all: number;
};
export type VersionsMinAggregateInputType = {
    id?: true;
    document_id?: true;
    created_by?: true;
    created_at?: true;
};
export type VersionsMaxAggregateInputType = {
    id?: true;
    document_id?: true;
    created_by?: true;
    created_at?: true;
};
export type VersionsCountAggregateInputType = {
    id?: true;
    document_id?: true;
    content_snapshot?: true;
    created_by?: true;
    created_at?: true;
    _all?: true;
};
export type VersionsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which versions to aggregate.
     */
    where?: Prisma.versionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of versions to fetch.
     */
    orderBy?: Prisma.versionsOrderByWithRelationInput | Prisma.versionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.versionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned versions
    **/
    _count?: true | VersionsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: VersionsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: VersionsMaxAggregateInputType;
};
export type GetVersionsAggregateType<T extends VersionsAggregateArgs> = {
    [P in keyof T & keyof AggregateVersions]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVersions[P]> : Prisma.GetScalarType<T[P], AggregateVersions[P]>;
};
export type versionsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.versionsWhereInput;
    orderBy?: Prisma.versionsOrderByWithAggregationInput | Prisma.versionsOrderByWithAggregationInput[];
    by: Prisma.VersionsScalarFieldEnum[] | Prisma.VersionsScalarFieldEnum;
    having?: Prisma.versionsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VersionsCountAggregateInputType | true;
    _min?: VersionsMinAggregateInputType;
    _max?: VersionsMaxAggregateInputType;
};
export type VersionsGroupByOutputType = {
    id: string;
    document_id: string | null;
    content_snapshot: runtime.JsonValue;
    created_by: string | null;
    created_at: Date | null;
    _count: VersionsCountAggregateOutputType | null;
    _min: VersionsMinAggregateOutputType | null;
    _max: VersionsMaxAggregateOutputType | null;
};
export type GetVersionsGroupByPayload<T extends versionsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VersionsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VersionsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VersionsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VersionsGroupByOutputType[P]>;
}>>;
export type versionsWhereInput = {
    AND?: Prisma.versionsWhereInput | Prisma.versionsWhereInput[];
    OR?: Prisma.versionsWhereInput[];
    NOT?: Prisma.versionsWhereInput | Prisma.versionsWhereInput[];
    id?: Prisma.UuidFilter<"versions"> | string;
    document_id?: Prisma.UuidNullableFilter<"versions"> | string | null;
    content_snapshot?: Prisma.JsonFilter<"versions">;
    created_by?: Prisma.UuidNullableFilter<"versions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"versions"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    documents?: Prisma.XOR<Prisma.DocumentsNullableScalarRelationFilter, Prisma.documentsWhereInput> | null;
};
export type versionsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    document_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    content_snapshot?: Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    users?: Prisma.usersOrderByWithRelationInput;
    documents?: Prisma.documentsOrderByWithRelationInput;
};
export type versionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.versionsWhereInput | Prisma.versionsWhereInput[];
    OR?: Prisma.versionsWhereInput[];
    NOT?: Prisma.versionsWhereInput | Prisma.versionsWhereInput[];
    document_id?: Prisma.UuidNullableFilter<"versions"> | string | null;
    content_snapshot?: Prisma.JsonFilter<"versions">;
    created_by?: Prisma.UuidNullableFilter<"versions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"versions"> | Date | string | null;
    users?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.usersWhereInput> | null;
    documents?: Prisma.XOR<Prisma.DocumentsNullableScalarRelationFilter, Prisma.documentsWhereInput> | null;
}, "id">;
export type versionsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    document_id?: Prisma.SortOrderInput | Prisma.SortOrder;
    content_snapshot?: Prisma.SortOrder;
    created_by?: Prisma.SortOrderInput | Prisma.SortOrder;
    created_at?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.versionsCountOrderByAggregateInput;
    _max?: Prisma.versionsMaxOrderByAggregateInput;
    _min?: Prisma.versionsMinOrderByAggregateInput;
};
export type versionsScalarWhereWithAggregatesInput = {
    AND?: Prisma.versionsScalarWhereWithAggregatesInput | Prisma.versionsScalarWhereWithAggregatesInput[];
    OR?: Prisma.versionsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.versionsScalarWhereWithAggregatesInput | Prisma.versionsScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"versions"> | string;
    document_id?: Prisma.UuidNullableWithAggregatesFilter<"versions"> | string | null;
    content_snapshot?: Prisma.JsonWithAggregatesFilter<"versions">;
    created_by?: Prisma.UuidNullableWithAggregatesFilter<"versions"> | string | null;
    created_at?: Prisma.DateTimeNullableWithAggregatesFilter<"versions"> | Date | string | null;
};
export type versionsCreateInput = {
    id?: string;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
    users?: Prisma.usersCreateNestedOneWithoutVersionsInput;
    documents?: Prisma.documentsCreateNestedOneWithoutVersionsInput;
};
export type versionsUncheckedCreateInput = {
    id?: string;
    document_id?: string | null;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: string | null;
    created_at?: Date | string | null;
};
export type versionsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneWithoutVersionsNestedInput;
    documents?: Prisma.documentsUpdateOneWithoutVersionsNestedInput;
};
export type versionsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    document_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsCreateManyInput = {
    id?: string;
    document_id?: string | null;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: string | null;
    created_at?: Date | string | null;
};
export type versionsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    document_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type VersionsListRelationFilter = {
    every?: Prisma.versionsWhereInput;
    some?: Prisma.versionsWhereInput;
    none?: Prisma.versionsWhereInput;
};
export type versionsOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type versionsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    document_id?: Prisma.SortOrder;
    content_snapshot?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type versionsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    document_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type versionsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    document_id?: Prisma.SortOrder;
    created_by?: Prisma.SortOrder;
    created_at?: Prisma.SortOrder;
};
export type versionsCreateNestedManyWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput> | Prisma.versionsCreateWithoutDocumentsInput[] | Prisma.versionsUncheckedCreateWithoutDocumentsInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutDocumentsInput | Prisma.versionsCreateOrConnectWithoutDocumentsInput[];
    createMany?: Prisma.versionsCreateManyDocumentsInputEnvelope;
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
};
export type versionsUncheckedCreateNestedManyWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput> | Prisma.versionsCreateWithoutDocumentsInput[] | Prisma.versionsUncheckedCreateWithoutDocumentsInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutDocumentsInput | Prisma.versionsCreateOrConnectWithoutDocumentsInput[];
    createMany?: Prisma.versionsCreateManyDocumentsInputEnvelope;
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
};
export type versionsUpdateManyWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput> | Prisma.versionsCreateWithoutDocumentsInput[] | Prisma.versionsUncheckedCreateWithoutDocumentsInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutDocumentsInput | Prisma.versionsCreateOrConnectWithoutDocumentsInput[];
    upsert?: Prisma.versionsUpsertWithWhereUniqueWithoutDocumentsInput | Prisma.versionsUpsertWithWhereUniqueWithoutDocumentsInput[];
    createMany?: Prisma.versionsCreateManyDocumentsInputEnvelope;
    set?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    disconnect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    delete?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    update?: Prisma.versionsUpdateWithWhereUniqueWithoutDocumentsInput | Prisma.versionsUpdateWithWhereUniqueWithoutDocumentsInput[];
    updateMany?: Prisma.versionsUpdateManyWithWhereWithoutDocumentsInput | Prisma.versionsUpdateManyWithWhereWithoutDocumentsInput[];
    deleteMany?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
};
export type versionsUncheckedUpdateManyWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput> | Prisma.versionsCreateWithoutDocumentsInput[] | Prisma.versionsUncheckedCreateWithoutDocumentsInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutDocumentsInput | Prisma.versionsCreateOrConnectWithoutDocumentsInput[];
    upsert?: Prisma.versionsUpsertWithWhereUniqueWithoutDocumentsInput | Prisma.versionsUpsertWithWhereUniqueWithoutDocumentsInput[];
    createMany?: Prisma.versionsCreateManyDocumentsInputEnvelope;
    set?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    disconnect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    delete?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    update?: Prisma.versionsUpdateWithWhereUniqueWithoutDocumentsInput | Prisma.versionsUpdateWithWhereUniqueWithoutDocumentsInput[];
    updateMany?: Prisma.versionsUpdateManyWithWhereWithoutDocumentsInput | Prisma.versionsUpdateManyWithWhereWithoutDocumentsInput[];
    deleteMany?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
};
export type versionsCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput> | Prisma.versionsCreateWithoutUsersInput[] | Prisma.versionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutUsersInput | Prisma.versionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.versionsCreateManyUsersInputEnvelope;
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
};
export type versionsUncheckedCreateNestedManyWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput> | Prisma.versionsCreateWithoutUsersInput[] | Prisma.versionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutUsersInput | Prisma.versionsCreateOrConnectWithoutUsersInput[];
    createMany?: Prisma.versionsCreateManyUsersInputEnvelope;
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
};
export type versionsUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput> | Prisma.versionsCreateWithoutUsersInput[] | Prisma.versionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutUsersInput | Prisma.versionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.versionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.versionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.versionsCreateManyUsersInputEnvelope;
    set?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    disconnect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    delete?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    update?: Prisma.versionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.versionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.versionsUpdateManyWithWhereWithoutUsersInput | Prisma.versionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
};
export type versionsUncheckedUpdateManyWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput> | Prisma.versionsCreateWithoutUsersInput[] | Prisma.versionsUncheckedCreateWithoutUsersInput[];
    connectOrCreate?: Prisma.versionsCreateOrConnectWithoutUsersInput | Prisma.versionsCreateOrConnectWithoutUsersInput[];
    upsert?: Prisma.versionsUpsertWithWhereUniqueWithoutUsersInput | Prisma.versionsUpsertWithWhereUniqueWithoutUsersInput[];
    createMany?: Prisma.versionsCreateManyUsersInputEnvelope;
    set?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    disconnect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    delete?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    connect?: Prisma.versionsWhereUniqueInput | Prisma.versionsWhereUniqueInput[];
    update?: Prisma.versionsUpdateWithWhereUniqueWithoutUsersInput | Prisma.versionsUpdateWithWhereUniqueWithoutUsersInput[];
    updateMany?: Prisma.versionsUpdateManyWithWhereWithoutUsersInput | Prisma.versionsUpdateManyWithWhereWithoutUsersInput[];
    deleteMany?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
};
export type versionsCreateWithoutDocumentsInput = {
    id?: string;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
    users?: Prisma.usersCreateNestedOneWithoutVersionsInput;
};
export type versionsUncheckedCreateWithoutDocumentsInput = {
    id?: string;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: string | null;
    created_at?: Date | string | null;
};
export type versionsCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.versionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput>;
};
export type versionsCreateManyDocumentsInputEnvelope = {
    data: Prisma.versionsCreateManyDocumentsInput | Prisma.versionsCreateManyDocumentsInput[];
    skipDuplicates?: boolean;
};
export type versionsUpsertWithWhereUniqueWithoutDocumentsInput = {
    where: Prisma.versionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.versionsUpdateWithoutDocumentsInput, Prisma.versionsUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.versionsCreateWithoutDocumentsInput, Prisma.versionsUncheckedCreateWithoutDocumentsInput>;
};
export type versionsUpdateWithWhereUniqueWithoutDocumentsInput = {
    where: Prisma.versionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.versionsUpdateWithoutDocumentsInput, Prisma.versionsUncheckedUpdateWithoutDocumentsInput>;
};
export type versionsUpdateManyWithWhereWithoutDocumentsInput = {
    where: Prisma.versionsScalarWhereInput;
    data: Prisma.XOR<Prisma.versionsUpdateManyMutationInput, Prisma.versionsUncheckedUpdateManyWithoutDocumentsInput>;
};
export type versionsScalarWhereInput = {
    AND?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
    OR?: Prisma.versionsScalarWhereInput[];
    NOT?: Prisma.versionsScalarWhereInput | Prisma.versionsScalarWhereInput[];
    id?: Prisma.UuidFilter<"versions"> | string;
    document_id?: Prisma.UuidNullableFilter<"versions"> | string | null;
    content_snapshot?: Prisma.JsonFilter<"versions">;
    created_by?: Prisma.UuidNullableFilter<"versions"> | string | null;
    created_at?: Prisma.DateTimeNullableFilter<"versions"> | Date | string | null;
};
export type versionsCreateWithoutUsersInput = {
    id?: string;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
    documents?: Prisma.documentsCreateNestedOneWithoutVersionsInput;
};
export type versionsUncheckedCreateWithoutUsersInput = {
    id?: string;
    document_id?: string | null;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
};
export type versionsCreateOrConnectWithoutUsersInput = {
    where: Prisma.versionsWhereUniqueInput;
    create: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput>;
};
export type versionsCreateManyUsersInputEnvelope = {
    data: Prisma.versionsCreateManyUsersInput | Prisma.versionsCreateManyUsersInput[];
    skipDuplicates?: boolean;
};
export type versionsUpsertWithWhereUniqueWithoutUsersInput = {
    where: Prisma.versionsWhereUniqueInput;
    update: Prisma.XOR<Prisma.versionsUpdateWithoutUsersInput, Prisma.versionsUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.versionsCreateWithoutUsersInput, Prisma.versionsUncheckedCreateWithoutUsersInput>;
};
export type versionsUpdateWithWhereUniqueWithoutUsersInput = {
    where: Prisma.versionsWhereUniqueInput;
    data: Prisma.XOR<Prisma.versionsUpdateWithoutUsersInput, Prisma.versionsUncheckedUpdateWithoutUsersInput>;
};
export type versionsUpdateManyWithWhereWithoutUsersInput = {
    where: Prisma.versionsScalarWhereInput;
    data: Prisma.XOR<Prisma.versionsUpdateManyMutationInput, Prisma.versionsUncheckedUpdateManyWithoutUsersInput>;
};
export type versionsCreateManyDocumentsInput = {
    id?: string;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: string | null;
    created_at?: Date | string | null;
};
export type versionsUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    users?: Prisma.usersUpdateOneWithoutVersionsNestedInput;
};
export type versionsUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsUncheckedUpdateManyWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_by?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsCreateManyUsersInput = {
    id?: string;
    document_id?: string | null;
    content_snapshot: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Date | string | null;
};
export type versionsUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    documents?: Prisma.documentsUpdateOneWithoutVersionsNestedInput;
};
export type versionsUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    document_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsUncheckedUpdateManyWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    document_id?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content_snapshot?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    created_at?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type versionsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    document_id?: boolean;
    content_snapshot?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
}, ExtArgs["result"]["versions"]>;
export type versionsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    document_id?: boolean;
    content_snapshot?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
}, ExtArgs["result"]["versions"]>;
export type versionsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    document_id?: boolean;
    content_snapshot?: boolean;
    created_by?: boolean;
    created_at?: boolean;
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
}, ExtArgs["result"]["versions"]>;
export type versionsSelectScalar = {
    id?: boolean;
    document_id?: boolean;
    content_snapshot?: boolean;
    created_by?: boolean;
    created_at?: boolean;
};
export type versionsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "document_id" | "content_snapshot" | "created_by" | "created_at", ExtArgs["result"]["versions"]>;
export type versionsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
};
export type versionsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
};
export type versionsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.versions$usersArgs<ExtArgs>;
    documents?: boolean | Prisma.versions$documentsArgs<ExtArgs>;
};
export type $versionsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "versions";
    objects: {
        users: Prisma.$usersPayload<ExtArgs> | null;
        documents: Prisma.$documentsPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        document_id: string | null;
        content_snapshot: runtime.JsonValue;
        created_by: string | null;
        created_at: Date | null;
    }, ExtArgs["result"]["versions"]>;
    composites: {};
};
export type versionsGetPayload<S extends boolean | null | undefined | versionsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$versionsPayload, S>;
export type versionsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<versionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VersionsCountAggregateInputType | true;
};
export interface versionsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['versions'];
        meta: {
            name: 'versions';
        };
    };
    /**
     * Find zero or one Versions that matches the filter.
     * @param {versionsFindUniqueArgs} args - Arguments to find a Versions
     * @example
     * // Get one Versions
     * const versions = await prisma.versions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends versionsFindUniqueArgs>(args: Prisma.SelectSubset<T, versionsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Versions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {versionsFindUniqueOrThrowArgs} args - Arguments to find a Versions
     * @example
     * // Get one Versions
     * const versions = await prisma.versions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends versionsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, versionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsFindFirstArgs} args - Arguments to find a Versions
     * @example
     * // Get one Versions
     * const versions = await prisma.versions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends versionsFindFirstArgs>(args?: Prisma.SelectSubset<T, versionsFindFirstArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Versions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsFindFirstOrThrowArgs} args - Arguments to find a Versions
     * @example
     * // Get one Versions
     * const versions = await prisma.versions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends versionsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, versionsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Versions
     * const versions = await prisma.versions.findMany()
     *
     * // Get first 10 Versions
     * const versions = await prisma.versions.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const versionsWithIdOnly = await prisma.versions.findMany({ select: { id: true } })
     *
     */
    findMany<T extends versionsFindManyArgs>(args?: Prisma.SelectSubset<T, versionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Versions.
     * @param {versionsCreateArgs} args - Arguments to create a Versions.
     * @example
     * // Create one Versions
     * const Versions = await prisma.versions.create({
     *   data: {
     *     // ... data to create a Versions
     *   }
     * })
     *
     */
    create<T extends versionsCreateArgs>(args: Prisma.SelectSubset<T, versionsCreateArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Versions.
     * @param {versionsCreateManyArgs} args - Arguments to create many Versions.
     * @example
     * // Create many Versions
     * const versions = await prisma.versions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends versionsCreateManyArgs>(args?: Prisma.SelectSubset<T, versionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Versions and returns the data saved in the database.
     * @param {versionsCreateManyAndReturnArgs} args - Arguments to create many Versions.
     * @example
     * // Create many Versions
     * const versions = await prisma.versions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Versions and only return the `id`
     * const versionsWithIdOnly = await prisma.versions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends versionsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, versionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Versions.
     * @param {versionsDeleteArgs} args - Arguments to delete one Versions.
     * @example
     * // Delete one Versions
     * const Versions = await prisma.versions.delete({
     *   where: {
     *     // ... filter to delete one Versions
     *   }
     * })
     *
     */
    delete<T extends versionsDeleteArgs>(args: Prisma.SelectSubset<T, versionsDeleteArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Versions.
     * @param {versionsUpdateArgs} args - Arguments to update one Versions.
     * @example
     * // Update one Versions
     * const versions = await prisma.versions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends versionsUpdateArgs>(args: Prisma.SelectSubset<T, versionsUpdateArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Versions.
     * @param {versionsDeleteManyArgs} args - Arguments to filter Versions to delete.
     * @example
     * // Delete a few Versions
     * const { count } = await prisma.versions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends versionsDeleteManyArgs>(args?: Prisma.SelectSubset<T, versionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Versions
     * const versions = await prisma.versions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends versionsUpdateManyArgs>(args: Prisma.SelectSubset<T, versionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Versions and returns the data updated in the database.
     * @param {versionsUpdateManyAndReturnArgs} args - Arguments to update many Versions.
     * @example
     * // Update many Versions
     * const versions = await prisma.versions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Versions and only return the `id`
     * const versionsWithIdOnly = await prisma.versions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends versionsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, versionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Versions.
     * @param {versionsUpsertArgs} args - Arguments to update or create a Versions.
     * @example
     * // Update or create a Versions
     * const versions = await prisma.versions.upsert({
     *   create: {
     *     // ... data to create a Versions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Versions we want to update
     *   }
     * })
     */
    upsert<T extends versionsUpsertArgs>(args: Prisma.SelectSubset<T, versionsUpsertArgs<ExtArgs>>): Prisma.Prisma__versionsClient<runtime.Types.Result.GetResult<Prisma.$versionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsCountArgs} args - Arguments to filter Versions to count.
     * @example
     * // Count the number of Versions
     * const count = await prisma.versions.count({
     *   where: {
     *     // ... the filter for the Versions we want to count
     *   }
     * })
    **/
    count<T extends versionsCountArgs>(args?: Prisma.Subset<T, versionsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VersionsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VersionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VersionsAggregateArgs>(args: Prisma.Subset<T, VersionsAggregateArgs>): Prisma.PrismaPromise<GetVersionsAggregateType<T>>;
    /**
     * Group by Versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {versionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends versionsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: versionsGroupByArgs['orderBy'];
    } : {
        orderBy?: versionsGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, versionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVersionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the versions model
     */
    readonly fields: versionsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for versions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__versionsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.versions$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.versions$usersArgs<ExtArgs>>): Prisma.Prisma__usersClient<runtime.Types.Result.GetResult<Prisma.$usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    documents<T extends Prisma.versions$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.versions$documentsArgs<ExtArgs>>): Prisma.Prisma__documentsClient<runtime.Types.Result.GetResult<Prisma.$documentsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the versions model
 */
export interface versionsFieldRefs {
    readonly id: Prisma.FieldRef<"versions", 'String'>;
    readonly document_id: Prisma.FieldRef<"versions", 'String'>;
    readonly content_snapshot: Prisma.FieldRef<"versions", 'Json'>;
    readonly created_by: Prisma.FieldRef<"versions", 'String'>;
    readonly created_at: Prisma.FieldRef<"versions", 'DateTime'>;
}
/**
 * versions findUnique
 */
export type versionsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter, which versions to fetch.
     */
    where: Prisma.versionsWhereUniqueInput;
};
/**
 * versions findUniqueOrThrow
 */
export type versionsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter, which versions to fetch.
     */
    where: Prisma.versionsWhereUniqueInput;
};
/**
 * versions findFirst
 */
export type versionsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter, which versions to fetch.
     */
    where?: Prisma.versionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of versions to fetch.
     */
    orderBy?: Prisma.versionsOrderByWithRelationInput | Prisma.versionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for versions.
     */
    cursor?: Prisma.versionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of versions.
     */
    distinct?: Prisma.VersionsScalarFieldEnum | Prisma.VersionsScalarFieldEnum[];
};
/**
 * versions findFirstOrThrow
 */
export type versionsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter, which versions to fetch.
     */
    where?: Prisma.versionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of versions to fetch.
     */
    orderBy?: Prisma.versionsOrderByWithRelationInput | Prisma.versionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for versions.
     */
    cursor?: Prisma.versionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of versions.
     */
    distinct?: Prisma.VersionsScalarFieldEnum | Prisma.VersionsScalarFieldEnum[];
};
/**
 * versions findMany
 */
export type versionsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter, which versions to fetch.
     */
    where?: Prisma.versionsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of versions to fetch.
     */
    orderBy?: Prisma.versionsOrderByWithRelationInput | Prisma.versionsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing versions.
     */
    cursor?: Prisma.versionsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of versions.
     */
    distinct?: Prisma.VersionsScalarFieldEnum | Prisma.VersionsScalarFieldEnum[];
};
/**
 * versions create
 */
export type versionsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * The data needed to create a versions.
     */
    data: Prisma.XOR<Prisma.versionsCreateInput, Prisma.versionsUncheckedCreateInput>;
};
/**
 * versions createMany
 */
export type versionsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many versions.
     */
    data: Prisma.versionsCreateManyInput | Prisma.versionsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * versions createManyAndReturn
 */
export type versionsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * The data used to create many versions.
     */
    data: Prisma.versionsCreateManyInput | Prisma.versionsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * versions update
 */
export type versionsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * The data needed to update a versions.
     */
    data: Prisma.XOR<Prisma.versionsUpdateInput, Prisma.versionsUncheckedUpdateInput>;
    /**
     * Choose, which versions to update.
     */
    where: Prisma.versionsWhereUniqueInput;
};
/**
 * versions updateMany
 */
export type versionsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update versions.
     */
    data: Prisma.XOR<Prisma.versionsUpdateManyMutationInput, Prisma.versionsUncheckedUpdateManyInput>;
    /**
     * Filter which versions to update
     */
    where?: Prisma.versionsWhereInput;
    /**
     * Limit how many versions to update.
     */
    limit?: number;
};
/**
 * versions updateManyAndReturn
 */
export type versionsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * The data used to update versions.
     */
    data: Prisma.XOR<Prisma.versionsUpdateManyMutationInput, Prisma.versionsUncheckedUpdateManyInput>;
    /**
     * Filter which versions to update
     */
    where?: Prisma.versionsWhereInput;
    /**
     * Limit how many versions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * versions upsert
 */
export type versionsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * The filter to search for the versions to update in case it exists.
     */
    where: Prisma.versionsWhereUniqueInput;
    /**
     * In case the versions found by the `where` argument doesn't exist, create a new versions with this data.
     */
    create: Prisma.XOR<Prisma.versionsCreateInput, Prisma.versionsUncheckedCreateInput>;
    /**
     * In case the versions was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.versionsUpdateInput, Prisma.versionsUncheckedUpdateInput>;
};
/**
 * versions delete
 */
export type versionsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
    /**
     * Filter which versions to delete.
     */
    where: Prisma.versionsWhereUniqueInput;
};
/**
 * versions deleteMany
 */
export type versionsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which versions to delete
     */
    where?: Prisma.versionsWhereInput;
    /**
     * Limit how many versions to delete.
     */
    limit?: number;
};
/**
 * versions.users
 */
export type versions$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: Prisma.usersSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the users
     */
    omit?: Prisma.usersOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.usersInclude<ExtArgs> | null;
    where?: Prisma.usersWhereInput;
};
/**
 * versions.documents
 */
export type versions$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the documents
     */
    select?: Prisma.documentsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the documents
     */
    omit?: Prisma.documentsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.documentsInclude<ExtArgs> | null;
    where?: Prisma.documentsWhereInput;
};
/**
 * versions without action
 */
export type versionsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the versions
     */
    select?: Prisma.versionsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the versions
     */
    omit?: Prisma.versionsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.versionsInclude<ExtArgs> | null;
};
//# sourceMappingURL=versions.d.ts.map