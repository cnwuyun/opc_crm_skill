// ==================== 认证相关类型 ====================

export interface Register {
  company_name: string;
  owner_name: string;
  email: string;
  phone?: string;
  api_password: string;
}

export interface Login {
  login_name: string;
  api_password: string;
}

export interface ChangePassword {
  old_password: string;
  new_password: string;
}

export interface Profile {
  id: number;
  company_name: string;
  owner_name: string;
  email: string;
  phone?: string;
  status: string;
  created_at: string;
}

// ==================== 客户相关类型 ====================

export interface Customer {
  name: string;
  industry?: string;
  address?: string;
  notes?: string;
  source?: string;
  level?: 'important' | 'normal' | 'low';
}

export interface CustomerResponse extends Customer {
  id: number;
  company_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// ==================== 联系人相关类型 ====================

export interface Contact {
  customer_id: number;
  name: string;
  title?: string;
  phone?: string;
  email?: string;
  wechat?: string;
  is_primary?: 0 | 1;
  notes?: string;
}

export interface ContactResponse extends Contact {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
}

// ==================== 产品相关类型 ====================

export interface Product {
  name: string;
  code?: string;
  category?: string;
  price?: number;
  unit?: string;
  description?: string;
  status?: 'active' | 'inactive';
}

export interface ProductResponse extends Product {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
}

// ==================== 商机相关类型 ====================

export interface Opportunity {
  customer_id: number;
  title: string;
  description?: string;
  stage?: string;
  expected_amount?: number;
  expected_close_date?: string;
  product_id?: number;
  priority?: 'high' | 'medium' | 'low';
}

export interface OpportunityResponse extends Opportunity {
  id: number;
  company_id: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// ==================== 跟进记录相关类型 ====================

export interface FollowUp {
  opportunity_id: number;
  content: string;
  follow_type: 'phone' | 'visit' | 'email' | 'wechat' | 'other';
  follow_date: string;
  next_plan?: string;
}

export interface FollowUpResponse extends FollowUp {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
}

// ==================== 合同相关类型 ====================

export interface Contract {
  customer_id: number;
  contract_no: string;
  title: string;
  opportunity_id?: number;
  amount?: number;
  status?: 'draft' | 'active' | 'completed' | 'terminated';
  sign_date?: string;
  start_date?: string;
  end_date?: string;
  content?: string;
}

export interface ContractResponse extends Contract {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
}

// ==================== 服务请求相关类型 ====================

export interface ServiceRequest {
  customer_id: number;
  title: string;
  description: string;
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority?: 'high' | 'medium' | 'low';
  resolution?: string;
}

export interface ServiceRequestResponse extends ServiceRequest {
  id: number;
  company_id: number;
  ai_response?: string;
  created_at: string;
  updated_at: string;
}

// ==================== FAQ 相关类型 ====================

export interface FAQ {
  question: string;
  answer: string;
  category?: string;
  status?: 'active' | 'inactive';
}

export interface FAQResponse extends FAQ {
  id: number;
  company_id: number;
  hit_count: number;
  created_at: string;
  updated_at: string;
}

export interface FAQSearch {
  query: string;
  top_k?: number;
}

export interface FAQSearchResult {
  question: string;
  answer: string;
  category: string;
  similarity: number;
}

// ==================== 管理员相关类型 ====================

export interface Company {
  id: number;
  company_name: string;
  owner_name: string;
  email: string;
  phone?: string;
  status: string;
  created_at: string;
}

export interface Reject {
  reason?: string;
}

// ==================== API 客户端配置 ====================

export interface OPCClientConfig {
  baseUrl: string;
  companyId?: string;
  apiPassword?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
