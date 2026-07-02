<!-- 实时提示与话术推荐 -->
<template>
    <div class="smart-script-panel">
        <div class="panel-header">
            <span class="panel-title">实时提示与话术推荐</span>
            <i class="el-icon-close panel-close" @click="$emit('close')" />
        </div>

        <div class="panel-body">
            <!-- 制度条款推荐 -->
            <section class="panel-section">
                <div class="section-head">
                    <h4 class="section-title">【制度条款推荐】</h4>
                    <span class="section-action" @click="handleViewClauseDetail">[查看详情]</span>
                </div>
                <p class="clause-meta">{{ clauseData.title }} (来源:{{ clauseData.source }})</p>
                <p class="clause-highlight">
                    <span class="highlight-text">{{ clauseData.highlight }}</span>
                </p>
            </section>

            <!-- 案例摘要推荐 -->
            <section class="panel-section">
                <h4 class="section-title">【案例摘要推荐】</h4>
                <p class="section-content">{{ caseSummary }} (来源:判例库)</p>
            </section>

            <!-- 风险提示 -->
            <section class="panel-section panel-section--risk">
                <h4 class="section-title">【风险提示】</h4>
                <p class="risk-content">
                    <i class="el-icon-warning-outline risk-icon" />
                    {{ riskWarning }}
                </p>
            </section>

            <!-- 话术推荐 -->
            <section class="panel-section panel-section--script">
                <div class="section-head">
                    <h4 class="section-title">
                        【话术推荐】
                        <span class="section-sub">(根据语境生成)</span>
                    </h4>
                    <span
                        class="section-action"
                        :class="{ 'is-loading': scriptRegenerating }"
                        @click="handleRegenerate"
                    >
                        [{{ scriptRegenerating ? '生成中...' : '重新生成' }}]
                    </span>
                </div>
                <div class="script-box" :class="{ 'is-regenerating': scriptRegenerating }">
                    <p class="script-label">建议话术内容 (中立/合规)</p>
                    <p class="script-text">{{ currentScript }}</p>
                </div>
            </section>
        </div>

        <!-- 条款详情弹窗 -->
        <el-dialog
            title="制度条款详情"
            :visible.sync="clauseDetailVisible"
            width="520px"
            append-to-body
            class="clause-detail-dialog"
        >
            <div class="clause-detail">
                <h5>{{ clauseData.title }}</h5>
                <p class="detail-source">来源: {{ clauseData.source }}</p>
                <div class="detail-body" v-html="formattedClauseDetail" />
            </div>
            <span slot="footer">
                <el-button type="primary" size="small" @click="clauseDetailVisible = false">知道了</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
const DEFAULT_PANEL_DATA = {
    institution_rules: {
        title: '',
        source: '',
        content: '',
        full_text: ''
    },
    similar_case_summary: '',
    risk_warning: '',
    suggested_script: ''
};

function escapeHtml(value) {
    return String(value == null ? '' : value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeRegExp(value) {
    return String(value == null ? '' : value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default {
    name: 'SmartScriptPanel',
    props: {
        panelData: {
            type: Object,
            default: () => ({})
        },
        loading: {
            type: Boolean,
            default: false
        },
        scriptRegenerating: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            clauseDetailVisible: false
        };
    },
    computed: {
        normalizedPanelData() {
            return {
                ...DEFAULT_PANEL_DATA,
                ...(this.panelData || {}),
                institution_rules: {
                    ...DEFAULT_PANEL_DATA.institution_rules,
                    ...((this.panelData || {}).institution_rules || {})
                }
            };
        },
        clauseData() {
            const rules = this.normalizedPanelData.institution_rules;
            return {
                title: rules.title || '暂无制度条款推荐',
                source: rules.source || '系统分析',
                highlight: rules.content || '暂无命中的制度条款摘要',
                detail: rules.full_text || ''
            };
        },
        caseSummary() {
            return this.normalizedPanelData.similar_case_summary || '暂无相似案例摘要';
        },
        riskWarning() {
            return this.normalizedPanelData.risk_warning || '暂无风险提示';
        },
        currentScript() {
            return this.normalizedPanelData.suggested_script || '暂无推荐话术';
        },
        formattedClauseDetail() {
            const detail = String(this.clauseData.detail || '').trim();
            const highlight = String(this.clauseData.highlight || '').trim();
            if (!detail) {
                return '<p>暂无条款详情</p>';
            }
            const escapedDetail = escapeHtml(detail).replace(/\n/g, '<br>');
            if (!highlight) {
                return `<p>${escapedDetail}</p>`;
            }
            const target = escapeHtml(highlight);
            return `<p>${escapedDetail.replace(
                new RegExp(escapeRegExp(target), 'g'),
                `<span class="detail-highlight">${target}</span>`
            )}</p>`;
        }
    },
    methods: {
        handleViewClauseDetail() {
            this.clauseDetailVisible = true;
        },
        handleRegenerate() {
            if (this.scriptRegenerating || this.loading) return;
            this.$emit('regenerate');
        }
    }
};
</script>

<style scoped lang="scss">
.smart-script-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: linear-gradient(165deg, #f7f9fc 0%, #eef2f8 100%);
    border: 1px solid #d9e2ef;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(9, 88, 217, 0.08);
    animation: panel-in 0.28s ease-out;
}

@keyframes panel-in {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #fff;
    border-bottom: 1px solid #e4eaf3;
    flex-shrink: 0;

    .panel-title {
        font-size: 15px;
        font-weight: 600;
        color: #1a2b4a;
        letter-spacing: 0.02em;
    }

    .panel-close {
        font-size: 18px;
        color: #909399;
        cursor: pointer;
        padding: 2px;
        transition: color 0.2s;

        &:hover {
            color: #0958d9;
        }
    }
}

.panel-body {
    flex: 1;
    overflow-y: auto;
    padding: 12px 14px 14px;
}

.panel-section {
    background: #fff;
    border-radius: 6px;
    padding: 10px 12px;
    margin-bottom: 10px;
    border: 1px solid #e8edf4;

    &:last-child {
        margin-bottom: 0;
    }

    &--risk {
        border-color: #fde2e2;
        background: linear-gradient(135deg, #fff 0%, #fff9f9 100%);
    }

    &--script {
        margin-bottom: 0;
    }
}

.section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
}

.section-title {
    margin: 0 0 6px;
    font-size: 13px;
    font-weight: 600;
    color: #1a2b4a;
    line-height: 1.4;

    .section-sub {
        font-weight: 400;
        font-size: 12px;
        color: #909399;
    }
}

.section-head .section-title {
    margin-bottom: 0;
}

.section-action {
    font-size: 12px;
    color: #0958d9;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    margin-left: 8px;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.75;
    }

    &.is-loading {
        color: #909399;
        cursor: not-allowed;
    }
}

.clause-meta,
.section-content {
    margin: 0;
    font-size: 12px;
    color: #606266;
    line-height: 1.6;
}

.clause-highlight {
    margin: 6px 0 0;
    font-size: 12px;
    color: #606266;
    line-height: 1.6;

    .highlight-text {
        color: #e03e3e;
        font-weight: 500;
    }
}

.risk-content {
    margin: 0;
    font-size: 12px;
    color: #c45656;
    line-height: 1.6;
    display: flex;
    align-items: flex-start;
    gap: 4px;

    .risk-icon {
        margin-top: 2px;
        flex-shrink: 0;
    }
}

.script-box {
    margin-top: 8px;
    padding: 10px 12px;
    background: #f8fafc;
    border: 1px solid #dce3ed;
    border-radius: 6px;
    transition: opacity 0.3s;

    &.is-regenerating {
        opacity: 0.5;
    }

    .script-label {
        margin: 0 0 6px;
        font-size: 11px;
        color: #909399;
    }

    .script-text {
        margin: 0;
        font-size: 12px;
        color: #303133;
        line-height: 1.75;
        text-align: justify;
    }
}

.clause-detail {
    h5 {
        margin: 0 0 6px;
        font-size: 15px;
        color: #303133;
    }

    .detail-source {
        margin: 0 0 12px;
        font-size: 12px;
        color: #909399;
    }

    .detail-body {
        font-size: 13px;
        color: #606266;
        line-height: 1.8;

        ::v-deep .detail-highlight {
            color: #e03e3e;
            font-weight: 600;
        }

        ::v-deep p {
            margin: 0 0 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}
</style>
