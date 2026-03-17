/**
 * OPC Sales Skill - CRM 销售管理系统 API 集成
 *
 * 本模块提供对 OPC CRM 系统的完整 API 集成，
 * 支持客户、联系人、产品、商机、合同、跟进记录、服务请求和 FAQ 等功能。
 */

import { OPCClient, createOPCClient } from './client';
import {
  OPCClientConfig,
  ApiResponse,
  Register,
  Login,
  ChangePassword,
  Profile,
  Customer,
  CustomerResponse,
  Contact,
  ContactResponse,
  Product,
  ProductResponse,
  Opportunity,
  OpportunityResponse,
  FollowUp,
  FollowUpResponse,
  Contract,
  ContractResponse,
  ServiceRequest,
  ServiceRequestResponse,
  FAQ,
  FAQResponse,
  FAQSearch,
  FAQSearchResult,
  Company,
  Reject,
} from './types';

export * from './types';
export { OPCClient, createOPCClient };

// ==================== Skill 导出 ====================

export interface OPCSalesSkillConfig {
  baseUrl: string;
  companyId?: string;
  apiPassword?: string;
}

/**
 * 创建 OPC Sales Skill 实例
 */
export function createOPCSalesSkill(config: OPCSalesSkillConfig): OPCClient {
  return createOPCClient({
    baseUrl: config.baseUrl,
    companyId: config.companyId,
    apiPassword: config.apiPassword,
  });
}

/**
 * 快捷函数：登录并创建认证客户端
 */
export async function loginAndCreateClient(
  baseUrl: string,
  loginName: string,
  apiPassword: string
): Promise<ApiResponse<OPCClient>> {
  const client = createOPCClient({ baseUrl });

  const result = await client.login({
    login_name: loginName,
    api_password: apiPassword,
  });

  if (result.success) {
    return { success: true, data: client };
  }

  return result;
}

/**
 * 销售流程示例：创建客户 -> 添加联系人 -> 创建商机 -> 跟进 -> 签订合同
 */
export async function salesProcessExample(
  client: OPCClient,
  customerData: {
    customer: Customer;
    contact: Contact;
    opportunity: Opportunity;
    followUp: FollowUp;
    contract: Contract;
  }
): Promise<{
  customer?: CustomerResponse;
  contact?: ContactResponse;
  opportunity?: OpportunityResponse;
  followUp?: FollowUpResponse;
  contract?: ContractResponse;
  errors: string[];
}> {
  const result = {
    errors: [] as string[],
  };

  try {
    // 1. 创建客户
    const customerResult = await client.createCustomer(customerData.customer);
    if (customerResult.success && customerResult.data) {
      result.customer = customerResult.data;
    } else {
      result.errors.push(`创建客户失败: ${customerResult.message || customerResult.error}`);
      return result;
    }

    // 2. 添加联系人
    const contactResult = await client.createContact({
      ...customerData.contact,
      customer_id: result.customer.id,
    });
    if (contactResult.success && contactResult.data) {
      result.contact = contactResult.data;
    } else {
      result.errors.push(`创建联系人失败: ${contactResult.message || contactResult.error}`);
    }

    // 3. 创建商机
    const opportunityResult = await client.createOpportunity({
      ...customerData.opportunity,
      customer_id: result.customer.id,
    });
    if (opportunityResult.success && opportunityResult.data) {
      result.opportunity = opportunityResult.data;
    } else {
      result.errors.push(`创建商机失败: ${opportunityResult.message || opportunityResult.error}`);
      return result;
    }

    // 4. 添加跟进记录
    const followUpResult = await client.createFollowUp({
      ...customerData.followUp,
      opportunity_id: result.opportunity.id,
    });
    if (followUpResult.success && followUpResult.data) {
      result.followUp = followUpResult.data;
    } else {
      result.errors.push(`创建跟进记录失败: ${followUpResult.message || followUpResult.error}`);
    }

    // 5. 签订合同
    const contractResult = await client.createContract({
      ...customerData.contract,
      customer_id: result.customer.id,
      opportunity_id: result.opportunity.id,
    });
    if (contractResult.success && contractResult.data) {
      result.contract = contractResult.data;
    } else {
      result.errors.push(`创建合同失败: ${contractResult.message || contractResult.error}`);
    }
  } catch (error: any) {
    result.errors.push(`销售流程执行失败: ${error.message}`);
  }

  return result;
}

// ==================== 类型导出 ====================

export type {
  OPCClientConfig,
  ApiResponse,
  Register,
  Login,
  ChangePassword,
  Profile,
  Customer,
  CustomerResponse,
  Contact,
  ContactResponse,
  Product,
  ProductResponse,
  Opportunity,
  OpportunityResponse,
  FollowUp,
  FollowUpResponse,
  Contract,
  ContractResponse,
  ServiceRequest,
  ServiceRequestResponse,
  FAQ,
  FAQResponse,
  FAQSearch,
  FAQSearchResult,
  Company,
  Reject,
};

// ==================== 使用示例 ====================

/**
 * 使用示例代码
 *
 * ```typescript
 * import { createOPCSalesSkill } from 'opc-sales-skill';
 *
 * // 创建客户端
 * const client = createOPCSalesSkill({
 *   baseUrl: 'http://localhost:5000',
 *   companyId: 'your-company-id',
 *   apiPassword: 'your-api-password'
 * });
 *
 * // 获取客户列表
 * const customers = await client.getCustomers();
 * console.log(customers);
 *
 * // 创建新客户
 * const newCustomer = await client.createCustomer({
 *   name: '示例公司',
 *   industry: 'IT',
 *   level: 'important'
 * });
 * console.log(newCustomer);
 * ```
 */

// 默认导出
export default {
  createOPCClient,
  createOPCSalesSkill,
  loginAndCreateClient,
  salesProcessExample,
};
