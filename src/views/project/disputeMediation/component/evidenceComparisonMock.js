/**
 * 证据比对报告 Mock 数据（与截图 YH2026000423 案例一致）
 */
export const EVIDENCE_COMPARISON_MOCK = {
    caseNo: 'YH2026000423',
    finalResult: {
        conclusion: '机构方证据相对更有利',
        summary:
            '综合双方提交材料后，机构方合同、录音、费用明细记录较完整，消费者方证据能佐证部分支付事实，但对诱导办理、费用不合理等主张的直接证明不足。',
        institutionAdvantage: 68,
        consumerAdvantage: 32,
        metrics: {
            evidenceCompleteness: 92,
            analysisConfidence: 86,
            disputePointCount: 5
        },
        disclaimer:
            '本比对结果中的"占优比例"仅表示在当前证据范围内对双方主张的支持程度，不代表最终胜败概率或调解结论。'
    },
    disputeSummary: {
        institutionWinCount: 4,
        consumerWinCount: 1
    },
    disputePoints: [
        {
            index: 1,
            title: '业务性质是否充分告知',
            institutionClaim: '合同、录音均明确载明业务性质为融资租赁。',
            consumerClaim: '消费者称系被销售人员误导办理，后知为融资租赁。',
            aiResult: '机构方证据更有利',
            institutionRatio: 76,
            consumerRatio: 24,
            keyEvidence: '合同首页、关键条款及双录视频均能确认业务性质，消费者关于"被误导"主张缺乏直接证据。',
            advantageTag: '机构方占优',
            advantageType: 'institution'
        },
        {
            index: 2,
            title: '融资金额及费用是否合理',
            institutionClaim: '融资金额、还款方式、提前结清费用均按合同约定执行。',
            consumerClaim: '融资96000元，提前结清需支付106196元，认为费用过高。',
            aiResult: '机构方证据相对更有利',
            institutionRatio: 64,
            consumerRatio: 36,
            keyEvidence: '主要费用与合同约定一致，但部分服务费告知记录仍需进一步核实。',
            advantageTag: '机构方相对占优',
            advantageType: 'institution_relative'
        },
        {
            index: 3,
            title: '提前结清是否已经完成',
            institutionClaim: '消费者已签字确认付款，结清完成，解押材料已发送。',
            consumerClaim: '银行流水显示未结清，车辆手续未及时办理。',
            aiResult: '机构方证据更有利',
            institutionRatio: 72,
            consumerRatio: 28,
            keyEvidence: '付款记录、结清证明相互印证，消费者方银行流水时间点需进一步核对。',
            advantageTag: '机构方占优',
            advantageType: 'institution'
        },
        {
            index: 4,
            title: '投诉处理是否及时',
            institutionClaim: '已按流程联系消费者并记录处理过程，不存在故意拖延。',
            consumerClaim: '多次反馈后间隔较长才收到回复，认为处理不及时。',
            aiResult: '机构方证据略占优，但处理时效存在瑕疵',
            institutionRatio: 58,
            consumerRatio: 42,
            keyEvidence: '投诉台账显示有联系记录，但部分反馈节点间隔超过合理时限，需补充说明。',
            advantageTag: '机构方相对占优',
            advantageType: 'institution_relative'
        },
        {
            index: 5,
            title: '消费者要求退还部分费用是否具有依据',
            institutionClaim: '费用按签约合同约定收取，不存在违规加收。',
            consumerClaim: '要求退还超出三个月的利息及其他不合理费用。',
            aiResult: '消费者方证据略占优',
            institutionRatio: 45,
            consumerRatio: 55,
            keyEvidence: '银行流水可证明实际支付金额，但机构方对部分费用明细及单项告知记录不够充分。',
            advantageTag: '消费者方略占优',
            advantageType: 'consumer_relative'
        }
    ],
    conclusionBasis: {
        dimensions: [
            { name: '真实性及来源可靠性', institution: 90, consumer: 82 },
            { name: '证据关联性', institution: 88, consumer: 78 },
            { name: '证据完整度', institution: 92, consumer: 70 },
            { name: '证据相互印证程度', institution: 86, consumer: 68 },
            { name: '对核心主张的直接证明力', institution: 84, consumer: 62 }
        ],
        institutionBasis: [
            '合同明确约定业务性质、融资金额及提前结清规则；',
            '双录视频可证明机构方已告知业务性质及费用构成；',
            '费用明细与合同约定条款对应；',
            '付款记录、结清证明、解押材料相互印证；',
            '投诉处理台账显示机构方已联系消费者处理。'
        ],
        consumerBasis: [
            '银行流水可证明实际融资及结清支付金额；',
            '聊天记录显示消费者对业务性质提出异议；',
            '部分服务费缺乏明确单项告知记录；',
            '投诉处理过程中部分反馈节点间隔较长；',
            '要求重新核算争议费用具有一定合理性。'
        ],
        summary:
            '综合比对，机构方在合同性质、结清流程方面证据链较完整，机构方证据占优比例为68%；但消费者对费用告知不足、处理时效的质疑具有一定合理性，建议调解时重点复核争议服务费项目。'
    },
    mediationSuggestions: [
        '确认双方融资租赁合同关系及主要条款；',
        '确认消费者提前结清是否已完成；',
        '对服务费、加付利息等项目进行专项核算；',
        '建议机构方补充费用计算方式及告知流程说明；',
        '可考虑对部分争议费用予以减免以促成和解；',
        '最终调解意见需由人工调解员审核确认。'
    ]
};

export function getEvidenceComparisonData(workOrderId) {
    return {
        ...EVIDENCE_COMPARISON_MOCK,
        caseNo: workOrderId || EVIDENCE_COMPARISON_MOCK.caseNo
    };
}
