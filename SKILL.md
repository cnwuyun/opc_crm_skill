# OPC CRM Skill

OPC CRM 销售管理系统 API 集成技能。
销售相关技能：用于管理客户、联系人、产品、商机、合同、跟进记录等销售相关业务。
客服相关技能：用于管理客户、联系人、服务请求和、 FAQ ，产品、商机、合同等客服相关业务。

## 认证方式

API 使用以下请求头进行认证：
- `X-Company-Id`: 7ac772b1-9f3c-4928-b96a-5fb067309de4
- `X-Api-Password`: 123456

## 功能概述

本技能提供以下业务功能的 RESTful API 集成：

### 1. 客户管理 (Customers)
- 创建客户 `/api/customers` - 添加新客户
- 客户列表 `/api/customers` - 获取所有客户
- 客户详情 `/api/customers/{id}` - 获取单个客户信息
- 更新客户 `/api/customers/{id}` - 修改客户信息
- 删除客户 `/api/customers/{id}` - 删除客户
- 按名称查询客户ID `/api/customers/by-name` - 通过客户名称查找客户ID
- 获取客户联系人 `/api/customers/{id}/contacts` - 获取客户关联的联系人
- 获取客户合同 `/api/customers/{id}/contracts` - 获取客户关联的合同
- 获取客户商机 `/api/customers/{id}/opportunities` - 获取客户关联的商机
- 获取客户服务请求 `/api/customers/{id}/service-requests` - 获取客户的服务请求

### 2. 联系人管理 (Contacts)
- 创建联系人 `/api/contacts` - 添加新联系人
- 联系人列表 `/api/contacts` - 获取所有联系人
- 联系人详情 `/api/contacts/{id}` - 获取单个联系人信息
- 更新联系人 `/api/contacts/{id}` - 修改联系人信息
- 删除联系人 `/api/contacts/{id}` - 删除联系人

### 3. 产品管理 (Products)
- 创建产品 `/api/products` - 添加新产品
- 产品列表 `/api/products` - 获取所有产品
- 产品详情 `/api/products/{id}` - 获取单个产品信息
- 更新产品 `/api/products/{id}` - 修改产品信息
- 删除产品 `/api/products/{id}` - 删除产品

### 4. 商机管理 (Opportunities)
- 创建商机 `/api/opportunities` - 添加新商机
- 商机列表 `/api/opportunities` - 获取所有商机
- 商机详情 `/api/opportunities/{id}` - 获取单个商机信息
- 更新商机 `/api/opportunities/{id}` - 修改商机信息
- 删除商机 `/api/opportunities/{id}` - 删除商机
- 获取商机跟进记录 `/api/opportunities/{id}/follow-ups` - 获取商机的跟进记录

### 5. 跟进记录管理 (Follow-ups)
- 创建跟进记录 `/api/follow-ups` - 添加新跟进记录
- 跟进记录列表 `/api/follow-ups` - 获取所有跟进记录
- 跟进记录详情 `/api/follow-ups/{id}` - 获取单条跟进记录
- 更新跟进记录 `/api/follow-ups/{id}` - 修改跟进记录
- 删除跟进记录 `/api/follow-ups/{id}` - 删除跟进记录

### 6. 合同管理 (Contracts)
- 创建合同 `/api/contracts` - 添加新合同
- 合同列表 `/api/contracts` - 获取所有合同
- 合同详情 `/api/contracts/{id}` - 获取单个合同信息
- 更新合同 `/api/contracts/{id}` - 修改合同信息
- 删除合同 `/api/contracts/{id}` - 删除合同

### 7. 服务请求管理 (Service Requests)
- 创建服务请求 `/api/service-requests` - 创建服务请求（自动生成AI回复）
- 服务请求列表 `/api/service-requests` - 获取所有服务请求
- 服务请求详情 `/api/service-requests/{id}` - 获取单个服务请求
- 更新服务请求 `/api/service-requests/{id}` - 修改服务请求
- 删除服务请求 `/api/service-requests/{id}` - 删除服务请求
- 重新生成AI回复 `/api/service-requests/{id}/regenerate` - 重新生成AI回答

### 8. FAQ 知识库管理
- 创建FAQ `/api/faq` - 添加新FAQ（同步写入Chroma向量库）
- FAQ列表 `/api/faq` - 获取所有FAQ
- FAQ详情 `/api/faq/{id}` - 获取单条FAQ
- 更新FAQ `/api/faq/{id}` - 修改FAQ（同步更新Chroma）
- 删除FAQ `/api/faq/{id}` - 删除FAQ（同步删除Chroma）
- 热门问题 `/api/faq/hot` - 按命中次数排序的热门问题
- 语义搜索FAQ `/api/faq/search` - 基于语义向量搜索FAQ

## 数据模型

### Customer (客户)
- `name` (必填): 客户名称
- `industry`: 行业
- `address`: 地址
- `notes`: 备注
- `source`: 客户来源
- `level`: 客户级别 (重要/一般/低)

### Contact (联系人)
- `customer_id` (必填): 客户ID
- `name` (必填): 联系人姓名
- `title`: 职位
- `phone`: 电话
- `email`: 邮箱
- `wechat`: 微信
- `is_primary`: 是否主要联系人 (是/否)
- `notes`: 备注

### Product (产品)
- `name` (必填): 产品名称
- `code`: 产品编号
- `category`: 分类
- `price`: 标准价格
- `unit`: 单位
- `description`: 产品描述
- `status`: 状态 (激活/非激活)

### Opportunity (商机)
- `customer_id` (必填): 客户ID
- `title` (必填): 商机标题
- `description`: 描述
- `stage`: 阶段
- `expected_amount`: 预期金额
- `expected_close_date`: 预期成交日期
- `product_id`: 关联产品ID
- `priority`: 优先级 (高/中/低)

### FollowUp (跟进记录)
- `opportunity_id` (必填): 商机ID
- `content` (必填): 跟进内容
- `follow_type` (必填): 跟进方式 (电话/拜访/微信/其他)
- `follow_date` (必填): 跟进日期
- `next_plan`: 下次计划

### Contract (合同)
- `customer_id` (必填): 客户ID
- `contract_no` (必填): 合同编号
- `title` (必填): 合同标题
- `opportunity_id`: 商机ID
- `amount`: 合同金额
- `status`: 状态 (草稿/激活/完成/终止)
- `sign_date`: 签约日期
- `start_date`: 开始日期
- `end_date`: 结束日期
- `content`: 合同说明

### ServiceRequest (服务请求)
- `customer_id` (必填): 客户ID
- `title` (必填): 请求标题
- `description` (必填): 问题描述
- `status`: 状态 (新建/进行中/已解决/已关闭)
- `priority`: 优先级 (高/中/低)
- `resolution`: 人工解决方案

### FAQ
- `question` (必填): 问题
- `answer` (必填): 答案
- `category`: 分类
- `status`: 状态 (激活/非激活)

## 使用场景

1. **销售流程管理**: 创建客户 -> 添加联系人 -> 创建商机 -> 跟进记录 -> 签订合同
2. **客户服务**: 创建服务请求 -> 自动生成AI回复 -> 人工介入解决
3. **知识库管理**: 创建/更新FAQ -> 语义搜索 FAQ


## 注意事项

- 所有需要认证的接口都必须在请求头中包含 `X-Company-Id` 和 `X-Api-Password`
- **中文编码**: 调用 API 时必须确保使用 UTF-8 编码，推荐使用 Python 的 requests 库或 Node.js 的 axios 库，避免 Windows 命令行 curl 的编码问题

## API 调用示例

### Python 示例 (推荐)
```python
import requests

headers = {
    'X-Company-Id': '7ac772b1-9f3c-4928-b96a-5fb067309de4',
    'X-Api-Password': '123456',
    'Content-Type': 'application/json; charset=utf-8'
}

# 获取客户列表
r = requests.get('http://49.232.56.136:5002/api/customers', headers=headers)
print(r.json())

# 创建联系人
r = requests.post('http://49.232.56.136:5002/api/contacts',
    headers=headers,
    json={'customer_id': 1, 'name': '张三', 'title': '经理', 'phone': '13800138000'})
print(r.json())
```

### Node.js 示例
```javascript
const axios = require('axios');

const client = axios.create({
  baseURL: 'http://49.232.56.136:5002',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'X-Company-Id': '7ac772b1-9f3c-4928-b96a-5fb067309de4',
    'X-Api-Password': '123456'
  }
});

const response = await client.get('/api/customers');
console.log(response.data);
```

