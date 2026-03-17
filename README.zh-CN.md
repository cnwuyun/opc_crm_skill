# OPC CRM Skill

适用于 [OpenClaw](https://openclaw.ai) 的 OPC CRM 系统集成 Skill，支持客户、联系人、产品、商机、跟进记录、合同、服务请求和 FAQ 的完整管理，并内置 AI 客服回复与 FAQ 语义搜索能力。

[English Documentation](./README.md)

## 导入 OpenClaw

将 GitHub 仓库链接直接粘贴到 OpenClaw 助手的对话框，让助手自动完成安装：

```
https://github.com/cnwuyun/opc_crm_skill
```

**手动安装：**

将 skill 文件夹复制到 OpenClaw 工作目录：

```bash
# 全局安装
cp -r opc_crm_skill ~/.openclaw/skills/opc-crm-skill

# 或项目级安装
cp -r opc_crm_skill <your-project>/skills/opc-crm-skill
```

## 认证方式

所有 API 请求需要以下请求头（在初始化 Skill 时统一配置）：

| 请求头 | 说明 |
|---|---|
| `X-Company-Id` | 公司 UUID |
| `X-Api-Password` | API 密码 |

当前skill预制了一个公用的测试账号。
想获得自己的账号，可以登录www.opccrm.com注册获得。

## 功能列表

### 1. 客户管理 (Customers)

| 操作 | 接口 |
|---|---|
| 客户列表 | `GET /api/customers` |
| 客户详情 | `GET /api/customers/{id}` |
| 创建客户 | `POST /api/customers` |
| 更新客户 | `PUT /api/customers/{id}` |
| 删除客户 | `DELETE /api/customers/{id}` |
| 按名称查询 | `GET /api/customers/by-name` |
| 获取客户联系人 | `GET /api/customers/{id}/contacts` |
| 获取客户合同 | `GET /api/customers/{id}/contracts` |
| 获取客户商机 | `GET /api/customers/{id}/opportunities` |
| 获取客户服务请求 | `GET /api/customers/{id}/service-requests` |

### 2. 联系人管理 (Contacts)

| 操作 | 接口 |
|---|---|
| 联系人列表 | `GET /api/contacts` |
| 联系人详情 | `GET /api/contacts/{id}` |
| 创建联系人 | `POST /api/contacts` |
| 更新联系人 | `PUT /api/contacts/{id}` |
| 删除联系人 | `DELETE /api/contacts/{id}` |

### 3. 产品管理 (Products)

| 操作 | 接口 |
|---|---|
| 产品列表 | `GET /api/products` |
| 产品详情 | `GET /api/products/{id}` |
| 创建产品 | `POST /api/products` |
| 更新产品 | `PUT /api/products/{id}` |
| 删除产品 | `DELETE /api/products/{id}` |

### 4. 商机管理 (Opportunities)

| 操作 | 接口 |
|---|---|
| 商机列表 | `GET /api/opportunities` |
| 商机详情 | `GET /api/opportunities/{id}` |
| 创建商机 | `POST /api/opportunities` |
| 更新商机 | `PUT /api/opportunities/{id}` |
| 删除商机 | `DELETE /api/opportunities/{id}` |
| 获取跟进记录 | `GET /api/opportunities/{id}/follow-ups` |

### 5. 跟进记录管理 (Follow-ups)

| 操作 | 接口 |
|---|---|
| 跟进记录列表 | `GET /api/follow-ups` |
| 跟进记录详情 | `GET /api/follow-ups/{id}` |
| 创建跟进记录 | `POST /api/follow-ups` |
| 更新跟进记录 | `PUT /api/follow-ups/{id}` |
| 删除跟进记录 | `DELETE /api/follow-ups/{id}` |

### 6. 合同管理 (Contracts)

| 操作 | 接口 |
|---|---|
| 合同列表 | `GET /api/contracts` |
| 合同详情 | `GET /api/contracts/{id}` |
| 创建合同 | `POST /api/contracts` |
| 更新合同 | `PUT /api/contracts/{id}` |
| 删除合同 | `DELETE /api/contracts/{id}` |

### 7. 服务请求管理 (Service Requests)

| 操作 | 接口 |
|---|---|
| 服务请求列表 | `GET /api/service-requests` |
| 服务请求详情 | `GET /api/service-requests/{id}` |
| 创建服务请求 | `POST /api/service-requests`（自动生成 AI 回复） |
| 更新服务请求 | `PUT /api/service-requests/{id}` |
| 删除服务请求 | `DELETE /api/service-requests/{id}` |
| 重新生成 AI 回复 | `POST /api/service-requests/{id}/regenerate` |

### 8. FAQ 知识库管理

| 操作 | 接口 |
|---|---|
| FAQ 列表 | `GET /api/faq` |
| FAQ 详情 | `GET /api/faq/{id}` |
| 创建 FAQ | `POST /api/faq`（同步写入 Chroma 向量库） |
| 更新 FAQ | `PUT /api/faq/{id}`（同步更新 Chroma） |
| 删除 FAQ | `DELETE /api/faq/{id}`（同步删除 Chroma） |
| 热门问题 | `GET /api/faq/hot` |
| 语义搜索 | `GET /api/faq/search` |

## 数据模型

### Customer（客户）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | string | 是 | 客户名称 |
| `industry` | string | | 行业 |
| `address` | string | | 地址 |
| `notes` | string | | 备注 |
| `source` | string | | 客户来源 |
| `level` | `important` \| `normal` \| `low` | | 客户级别 |

### Contact（联系人）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `customer_id` | number | 是 | 所属客户 ID |
| `name` | string | 是 | 联系人姓名 |
| `title` | string | | 职位 |
| `phone` | string | | 电话 |
| `email` | string | | 邮箱 |
| `wechat` | string | | 微信 |
| `is_primary` | `0` \| `1` | | 是否主要联系人 |
| `notes` | string | | 备注 |

### Product（产品）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | string | 是 | 产品名称 |
| `code` | string | | 产品编号 |
| `category` | string | | 分类 |
| `price` | number | | 标准价格 |
| `unit` | string | | 单位 |
| `description` | string | | 产品描述 |
| `status` | `active` \| `inactive` | | 状态 |

### Opportunity（商机）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `customer_id` | number | 是 | 客户 ID |
| `title` | string | 是 | 商机标题 |
| `description` | string | | 描述 |
| `stage` | string | | 销售阶段 |
| `expected_amount` | number | | 预期金额 |
| `expected_close_date` | string | | 预期成交日期 |
| `product_id` | number | | 关联产品 ID |
| `priority` | `high` \| `medium` \| `low` | | 优先级 |

### FollowUp（跟进记录）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `opportunity_id` | number | 是 | 商机 ID |
| `content` | string | 是 | 跟进内容 |
| `follow_type` | `phone` \| `visit` \| `email` \| `wechat` \| `other` | 是 | 跟进方式 |
| `follow_date` | string | 是 | 跟进日期 |
| `next_plan` | string | | 下次计划 |

### Contract（合同）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `customer_id` | number | 是 | 客户 ID |
| `contract_no` | string | 是 | 合同编号 |
| `title` | string | 是 | 合同标题 |
| `opportunity_id` | number | | 关联商机 ID |
| `amount` | number | | 合同金额 |
| `status` | `draft` \| `active` \| `completed` \| `terminated` | | 状态 |
| `sign_date` | string | | 签约日期 |
| `start_date` | string | | 开始日期 |
| `end_date` | string | | 结束日期 |
| `content` | string | | 合同说明 |

### ServiceRequest（服务请求）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `customer_id` | number | 是 | 客户 ID |
| `title` | string | 是 | 请求标题 |
| `description` | string | 是 | 问题描述 |
| `status` | `open` \| `in_progress` \| `resolved` \| `closed` | | 状态 |
| `priority` | `high` \| `medium` \| `low` | | 优先级 |
| `resolution` | string | | 人工解决方案 |

### FAQ

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `question` | string | 是 | 问题 |
| `answer` | string | 是 | 答案 |
| `category` | string | | 分类 |
| `status` | `active` \| `inactive` | | 状态 |

## 典型业务场景

**销售流程：**
> 创建客户 → 添加联系人 → 创建商机 → 记录跟进 → 签订合同

**客户服务流程：**
> 创建服务请求 → AI 自动生成回复 → 人工审核/解决

**知识库管理流程：**
> 创建/更新 FAQ → 通过自然语言语义搜索相关问题


## 许可证

MIT
