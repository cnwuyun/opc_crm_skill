import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
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

export class OPCClient {
  private client: AxiosInstance;
  private companyId?: string;
  private apiPassword?: string;

  constructor(config: OPCClientConfig) {
    this.companyId = config.companyId;
    this.apiPassword = config.apiPassword;

    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json; charset=utf-8',
      },
      transformRequest: [(data) => {
        // 确保中文字符正确编码
        return JSON.stringify(data);
      }],
      transformResponse: [(data) => {
        // 解析JSON响应
        return JSON.parse(data);
      }],
    });

    // 添加请求拦截器
    this.client.interceptors.request.use((config) => {
      if (this.companyId) {
        config.headers['X-Company-Id'] = this.companyId;
      }
      if (this.apiPassword) {
        config.headers['X-Api-Password'] = this.apiPassword;
      }
      return config;
    });
  }

  // 设置认证信息
  setAuth(companyId: string, apiPassword: string): void {
    this.companyId = companyId;
    this.apiPassword = apiPassword;
  }

  // 清除认证信息
  clearAuth(): void {
    this.companyId = undefined;
    this.apiPassword = undefined;
  }

  // ==================== 认证接口 ====================

  /** 公司注册 */
  async register(data: Register): Promise<ApiResponse<Company>> {
    const response = await this.client.post('/api/auth/register', data);
    return response.data;
  }

  /** 公司登录 */
  async login(data: Login): Promise<ApiResponse<{ company_id: string; api_password: string }>> {
    const response = await this.client.post('/api/auth/login', data);
    if (response.data.success && response.data.data) {
      this.setAuth(response.data.data.company_id, response.data.data.api_password);
    }
    return response.data;
  }

  /** 修改API密码 */
  async changePassword(data: ChangePassword): Promise<ApiResponse> {
    const response = await this.client.put('/api/auth/password', data);
    return response.data;
  }

  /** 获取当前公司信息 */
  async getProfile(): Promise<ApiResponse<Profile>> {
    const response = await this.client.get('/api/auth/profile');
    return response.data;
  }

  // ==================== 客户接口 ====================

  /** 创建客户 */
  async createCustomer(data: Customer): Promise<ApiResponse<CustomerResponse>> {
    const response = await this.client.post('/api/customers', data);
    return response.data;
  }

  /** 获取客户列表 */
  async getCustomers(): Promise<ApiResponse<CustomerResponse[]>> {
    const response = await this.client.get('/api/customers');
    return response.data;
  }

  /** 获取客户详情 */
  async getCustomer(id: number): Promise<ApiResponse<CustomerResponse>> {
    const response = await this.client.get(`/api/customers/${id}`);
    return response.data;
  }

  /** 更新客户 */
  async updateCustomer(id: number, data: Customer): Promise<ApiResponse<CustomerResponse>> {
    const response = await this.client.put(`/api/customers/${id}`, data);
    return response.data;
  }

  /** 删除客户 */
  async deleteCustomer(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/customers/${id}`);
    return response.data;
  }

  /** 通过客户名称查询客户ID */
  async getCustomerIdByName(name: string): Promise<ApiResponse<{ id: number }>> {
    const response = await this.client.get('/api/customers/by-name', { params: { name } });
    return response.data;
  }

  /** 获取客户的联系人列表 */
  async getCustomerContacts(customerId: number): Promise<ApiResponse<ContactResponse[]>> {
    const response = await this.client.get(`/api/customers/${customerId}/contacts`);
    return response.data;
  }

  /** 获取客户的合同列表 */
  async getCustomerContracts(customerId: number): Promise<ApiResponse<ContractResponse[]>> {
    const response = await this.client.get(`/api/customers/${customerId}/contracts`);
    return response.data;
  }

  /** 获取客户的商机列表 */
  async getCustomerOpportunities(customerId: number): Promise<ApiResponse<OpportunityResponse[]>> {
    const response = await this.client.get(`/api/customers/${customerId}/opportunities`);
    return response.data;
  }

  /** 获取客户的服务请求列表 */
  async getCustomerServiceRequests(customerId: number): Promise<ApiResponse<ServiceRequestResponse[]>> {
    const response = await this.client.get(`/api/customers/${customerId}/service-requests`);
    return response.data;
  }

  // ==================== 联系人接口 ====================

  /** 创建联系人 */
  async createContact(data: Contact): Promise<ApiResponse<ContactResponse>> {
    const response = await this.client.post('/api/contacts', data);
    return response.data;
  }

  /** 获取联系人列表 */
  async getContacts(): Promise<ApiResponse<ContactResponse[]>> {
    const response = await this.client.get('/api/contacts');
    return response.data;
  }

  /** 获取联系人详情 */
  async getContact(id: number): Promise<ApiResponse<ContactResponse>> {
    const response = await this.client.get(`/api/contacts/${id}`);
    return response.data;
  }

  /** 更新联系人 */
  async updateContact(id: number, data: Contact): Promise<ApiResponse<ContactResponse>> {
    const response = await this.client.put(`/api/contacts/${id}`, data);
    return response.data;
  }

  /** 删除联系人 */
  async deleteContact(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/contacts/${id}`);
    return response.data;
  }

  // ==================== 产品接口 ====================

  /** 创建产品 */
  async createProduct(data: Product): Promise<ApiResponse<ProductResponse>> {
    const response = await this.client.post('/api/products', data);
    return response.data;
  }

  /** 获取产品列表 */
  async getProducts(): Promise<ApiResponse<ProductResponse[]>> {
    const response = await this.client.get('/api/products');
    return response.data;
  }

  /** 获取产品详情 */
  async getProduct(id: number): Promise<ApiResponse<ProductResponse>> {
    const response = await this.client.get(`/api/products/${id}`);
    return response.data;
  }

  /** 更新产品 */
  async updateProduct(id: number, data: Product): Promise<ApiResponse<ProductResponse>> {
    const response = await this.client.put(`/api/products/${id}`, data);
    return response.data;
  }

  /** 删除产品 */
  async deleteProduct(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/products/${id}`);
    return response.data;
  }

  // ==================== 商机接口 ====================

  /** 创建商机 */
  async createOpportunity(data: Opportunity): Promise<ApiResponse<OpportunityResponse>> {
    const response = await this.client.post('/api/opportunities', data);
    return response.data;
  }

  /** 获取商机列表 */
  async getOpportunities(): Promise<ApiResponse<OpportunityResponse[]>> {
    const response = await this.client.get('/api/opportunities');
    return response.data;
  }

  /** 获取商机详情 */
  async getOpportunity(id: number): Promise<ApiResponse<OpportunityResponse>> {
    const response = await this.client.get(`/api/opportunities/${id}`);
    return response.data;
  }

  /** 更新商机 */
  async updateOpportunity(id: number, data: Opportunity): Promise<ApiResponse<OpportunityResponse>> {
    const response = await this.client.put(`/api/opportunities/${id}`, data);
    return response.data;
  }

  /** 删除商机 */
  async deleteOpportunity(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/opportunities/${id}`);
    return response.data;
  }

  /** 获取商机的跟进记录 */
  async getOpportunityFollowUps(opportunityId: number): Promise<ApiResponse<FollowUpResponse[]>> {
    const response = await this.client.get(`/api/opportunities/${opportunityId}/follow-ups`);
    return response.data;
  }

  // ==================== 跟进记录接口 ====================

  /** 创建跟进记录 */
  async createFollowUp(data: FollowUp): Promise<ApiResponse<FollowUpResponse>> {
    const response = await this.client.post('/api/follow-ups', data);
    return response.data;
  }

  /** 获取跟进记录列表 */
  async getFollowUps(): Promise<ApiResponse<FollowUpResponse[]>> {
    const response = await this.client.get('/api/follow-ups');
    return response.data;
  }

  /** 获取跟进记录详情 */
  async getFollowUp(id: number): Promise<ApiResponse<FollowUpResponse>> {
    const response = await this.client.get(`/api/follow-ups/${id}`);
    return response.data;
  }

  /** 更新跟进记录 */
  async updateFollowUp(id: number, data: FollowUp): Promise<ApiResponse<FollowUpResponse>> {
    const response = await this.client.put(`/api/follow-ups/${id}`, data);
    return response.data;
  }

  /** 删除跟进记录 */
  async deleteFollowUp(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/follow-ups/${id}`);
    return response.data;
  }

  // ==================== 合同接口 ====================

  /** 创建合同 */
  async createContract(data: Contract): Promise<ApiResponse<ContractResponse>> {
    const response = await this.client.post('/api/contracts', data);
    return response.data;
  }

  /** 获取合同列表 */
  async getContracts(): Promise<ApiResponse<ContractResponse[]>> {
    const response = await this.client.get('/api/contracts');
    return response.data;
  }

  /** 获取合同详情 */
  async getContract(id: number): Promise<ApiResponse<ContractResponse>> {
    const response = await this.client.get(`/api/contracts/${id}`);
    return response.data;
  }

  /** 更新合同 */
  async updateContract(id: number, data: Contract): Promise<ApiResponse<ContractResponse>> {
    const response = await this.client.put(`/api/contracts/${id}`, data);
    return response.data;
  }

  /** 删除合同 */
  async deleteContract(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/contracts/${id}`);
    return response.data;
  }

  // ==================== 服务请求接口 ====================

  /** 创建服务请求（自动生成AI回复） */
  async createServiceRequest(data: ServiceRequest): Promise<ApiResponse<ServiceRequestResponse>> {
    const response = await this.client.post('/api/service-requests', data);
    return response.data;
  }

  /** 获取服务请求列表 */
  async getServiceRequests(): Promise<ApiResponse<ServiceRequestResponse[]>> {
    const response = await this.client.get('/api/service-requests');
    return response.data;
  }

  /** 获取服务请求详情 */
  async getServiceRequest(id: number): Promise<ApiResponse<ServiceRequestResponse>> {
    const response = await this.client.get(`/api/service-requests/${id}`);
    return response.data;
  }

  /** 更新服务请求 */
  async updateServiceRequest(id: number, data: ServiceRequest): Promise<ApiResponse<ServiceRequestResponse>> {
    const response = await this.client.put(`/api/service-requests/${id}`, data);
    return response.data;
  }

  /** 删除服务请求 */
  async deleteServiceRequest(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/service-requests/${id}`);
    return response.data;
  }

  /** 重新生成AI回复 */
  async regenerateServiceRequest(id: number): Promise<ApiResponse<ServiceRequestResponse>> {
    const response = await this.client.post(`/api/service-requests/${id}/regenerate`);
    return response.data;
  }

  // ==================== FAQ 接口 ====================

  /** 创建FAQ（同步写入Chroma） */
  async createFAQ(data: FAQ): Promise<ApiResponse<FAQResponse>> {
    const response = await this.client.post('/api/faq', data);
    return response.data;
  }

  /** 获取FAQ列表 */
  async getFAQs(): Promise<ApiResponse<FAQResponse[]>> {
    const response = await this.client.get('/api/faq');
    return response.data;
  }

  /** 获取FAQ详情 */
  async getFAQ(id: number): Promise<ApiResponse<FAQResponse>> {
    const response = await this.client.get(`/api/faq/${id}`);
    return response.data;
  }

  /** 更新FAQ（同步更新Chroma） */
  async updateFAQ(id: number, data: FAQ): Promise<ApiResponse<FAQResponse>> {
    const response = await this.client.put(`/api/faq/${id}`, data);
    return response.data;
  }

  /** 删除FAQ（同步删除Chroma） */
  async deleteFAQ(id: number): ApiResponse {
    const response = await this.client.delete(`/api/faq/${id}`);
    return response.data;
  }

  /** 获取热门问题（按命中次数排序） */
  async getHotFAQs(): Promise<ApiResponse<FAQResponse[]>> {
    const response = await this.client.get('/api/faq/hot');
    return response.data;
  }

  /** 语义搜索FAQ */
  async searchFAQs(data: FAQSearch): Promise<ApiResponse<FAQSearchResult[]>> {
    const response = await this.client.post('/api/faq/search', data);
    return response.data;
  }

  // ==================== 管理员接口 ====================

  /** 获取所有公司列表 */
  async getCompanies(): Promise<ApiResponse<Company[]>> {
    const response = await this.client.get('/api/admin/companies');
    return response.data;
  }

  /** 获取公司详情 */
  async getCompany(id: number): Promise<ApiResponse<Company>> {
    const response = await this.client.get(`/api/admin/companies/${id}`);
    return response.data;
  }

  /** 删除公司 */
  async deleteCompany(id: number): Promise<ApiResponse> {
    const response = await this.client.delete(`/api/admin/companies/${id}`);
    return response.data;
  }

  /** 审批通过公司 */
  async approveCompany(id: number): Promise<ApiResponse> {
    const response = await this.client.put(`/api/admin/companies/${id}/approve`);
    return response.data;
  }

  /** 审批拒绝公司 */
  async rejectCompany(id: number, data: Reject): Promise<ApiResponse> {
    const response = await this.client.put(`/api/admin/companies/${id}/reject`, data);
    return response.data;
  }
}

// 导出默认客户端实例创建函数
export function createOPCClient(config: OPCClientConfig): OPCClient {
  return new OPCClient(config);
}
