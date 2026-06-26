<template>
    <div>
        <el-form :model="formInfo" :rules="rules" ref="agreementRuleForm" label-width="110px">
            <el-form-item label="是否履约" prop="isFulfill">
                <el-select v-model="formInfo.isFulfill" placeholder="请选择是否履约" style="width: 200px" :disabled="isEdit">
                    <el-option v-for="dict in dict.type.sys_yes_no" :key="dict.value" :label="dict.label" :value="dict.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="时间" prop="performanceRegistrationTime">
                <el-date-picker
                    v-model="formInfo.performanceRegistrationTime"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :placeholder="isEdit ? '' : '请选择时间'"
                    :disabled="isEdit"
                    style="width: 100%"
                    clearable
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="金额" prop="performanceRegistrationAmount">
                <el-input
                    v-model="formInfo.performanceRegistrationAmount"
                    :placeholder="isEdit ? '' : '请输入调解金额'"
                    :disabled="isEdit"
                    oninput="value=value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^(\d*\.\d{0,2}).*$/g, '$1')"
                    clearable
                >
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="事项" prop="performanceRegistrationReason">
                <el-input
                    :disabled="isEdit"
                    type="textarea"
                    v-model="formInfo.performanceRegistrationReason"
                    :placeholder="isEdit ? '' : '请输入事项'"
                    :autosize="{ minRows: 3 }"
                    maxlength="1000"
                    show-word-limit
                    clearable
                />
            </el-form-item>
            <el-form-item label="附件" prop="attachment">
                <file-upload
                    v-if="!isEdit || formInfo.attachment"
                    v-model="formInfo.attachment"
                    :isShowDele="!isEdit"
                    :isShowBtn="!isEdit"
                    :isShowTip="!isEdit"
                    :fileType="[
                        'bmp',
                        'jpg',
                        'jpeg',
                        'png',
                        'tif',
                        'gif',
                        'pdf',
                        'doc',
                        'docx',
                        'xls',
                        'xlsx',
                        'csv',
                        'mp4',
                        'avi',
                        'rmvb',
                        'flv',
                        'm4v',
                        'mov',
                        '3gp',
                        '3g2',
                        'wmv',
                        'mpg',
                        'mpeg',
                        'cd',
                        'wave',
                        'aiff',
                        'mp3',
                        'wav'
                    ]"
                />
                <span v-else>无</span>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: '',
    dicts: ['sys_yes_no'],
    props: {
        initialData: {
            type: Object,
            default: () => {}
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formInfo: {
                workOrderId: null,
                isFulfill: null,
                attachment: null,
                performanceRegistrationReason: null,
                performanceRegistrationAmount: null,
                performanceRegistrationTime: null
            },
            fileList: [],
            fileUrl: [],
            rules: {
                isFulfill: [{ required: true, message: '请选择是否履约', trigger: 'change' }],
                performanceRegistrationReason: [{ required: true, message: '事项为必填', trigger: 'blur' }],
                performanceRegistrationAmount: [{ required: true, message: '金额为必填', trigger: 'blur' }],
                performanceRegistrationTime: [{ required: true, message: '请选择回访日期', trigger: 'change' }]
            }
        };
    },

    watch: {
        initialData: {
            handler(newVal) {
                this.formInfo = {
                    ...this.formInfo,
                    ...newVal
                };
            },
            immediate: true,
            deep: true
        }
    },

    methods: {
        // 表单验证
        validateForm() {
            return this.$refs.agreementRuleForm.validate();
        },

        // 取消验证结果
        resetValidateForm() {
            this.$refs.agreementRuleForm.clearValidate();
        },

        // 重置表单
        resetForm() {
            this.$refs.agreementRuleForm.resetFields();
            this.fileList = [];
            this.fileUrl = [];
        },

        // 获取表单数据
        getFormData() {
            return {
                ...this.formInfo
            };
        }
    }
};
</script>

<style scoped lang="scss"></style>
