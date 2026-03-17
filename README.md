# OPC CRM Skill

An [OpenClaw](https://openclaw.ai) Skill for integrating with the OPC CRM system. Supports full management of customers, contacts, products, opportunities, follow-ups, contracts, service requests, and FAQs — including AI-powered service replies and semantic FAQ search.

[中文文档](./README.zh-CN.md)

## Import into OpenClaw

Paste the GitHub repository link directly into your OpenClaw assistant's chat and ask it to use or install the skill:

```
https://github.com/cnwuyun/opc_crm_skill
```

The assistant will handle setup automatically.

**Manual installation:**

Copy the skill folder to your OpenClaw workspace:

```bash
# Global
cp -r opc_crm_skill ~/.openclaw/skills/opc-crm-skill

# Or workspace-level
cp -r opc_crm_skill <your-project>/skills/opc-crm-skill
```

## Authentication

All API requests require the following headers, configured when initializing the skill:

| Header | Description |
|---|---|
| `X-Company-Id` | Your company UUID |
| `X-Api-Password` | Your API password |

This skill comes with a pre-configured public test account.
To get your own account, you can register at www.opccrm.com.

## Capabilities

### 1. Customer Management

| Action | Endpoint |
|---|---|
| List customers | `GET /api/customers` |
| Get customer | `GET /api/customers/{id}` |
| Create customer | `POST /api/customers` |
| Update customer | `PUT /api/customers/{id}` |
| Delete customer | `DELETE /api/customers/{id}` |
| Find by name | `GET /api/customers/by-name` |
| Get contacts | `GET /api/customers/{id}/contacts` |
| Get contracts | `GET /api/customers/{id}/contracts` |
| Get opportunities | `GET /api/customers/{id}/opportunities` |
| Get service requests | `GET /api/customers/{id}/service-requests` |

### 2. Contact Management

| Action | Endpoint |
|---|---|
| List contacts | `GET /api/contacts` |
| Get contact | `GET /api/contacts/{id}` |
| Create contact | `POST /api/contacts` |
| Update contact | `PUT /api/contacts/{id}` |
| Delete contact | `DELETE /api/contacts/{id}` |

### 3. Product Management

| Action | Endpoint |
|---|---|
| List products | `GET /api/products` |
| Get product | `GET /api/products/{id}` |
| Create product | `POST /api/products` |
| Update product | `PUT /api/products/{id}` |
| Delete product | `DELETE /api/products/{id}` |

### 4. Opportunity Management

| Action | Endpoint |
|---|---|
| List opportunities | `GET /api/opportunities` |
| Get opportunity | `GET /api/opportunities/{id}` |
| Create opportunity | `POST /api/opportunities` |
| Update opportunity | `PUT /api/opportunities/{id}` |
| Delete opportunity | `DELETE /api/opportunities/{id}` |
| Get follow-ups | `GET /api/opportunities/{id}/follow-ups` |

### 5. Follow-up Management

| Action | Endpoint |
|---|---|
| List follow-ups | `GET /api/follow-ups` |
| Get follow-up | `GET /api/follow-ups/{id}` |
| Create follow-up | `POST /api/follow-ups` |
| Update follow-up | `PUT /api/follow-ups/{id}` |
| Delete follow-up | `DELETE /api/follow-ups/{id}` |

### 6. Contract Management

| Action | Endpoint |
|---|---|
| List contracts | `GET /api/contracts` |
| Get contract | `GET /api/contracts/{id}` |
| Create contract | `POST /api/contracts` |
| Update contract | `PUT /api/contracts/{id}` |
| Delete contract | `DELETE /api/contracts/{id}` |

### 7. Service Request Management

| Action | Endpoint |
|---|---|
| List service requests | `GET /api/service-requests` |
| Get service request | `GET /api/service-requests/{id}` |
| Create service request | `POST /api/service-requests` (auto-generates AI reply) |
| Update service request | `PUT /api/service-requests/{id}` |
| Delete service request | `DELETE /api/service-requests/{id}` |
| Regenerate AI reply | `POST /api/service-requests/{id}/regenerate` |

### 8. FAQ Knowledge Base

| Action | Endpoint |
|---|---|
| List FAQs | `GET /api/faq` |
| Get FAQ | `GET /api/faq/{id}` |
| Create FAQ | `POST /api/faq` (synced to Chroma vector DB) |
| Update FAQ | `PUT /api/faq/{id}` (synced to Chroma) |
| Delete FAQ | `DELETE /api/faq/{id}` (synced to Chroma) |
| Hot FAQs | `GET /api/faq/hot` |
| Semantic search | `GET /api/faq/search` |

## Data Models

### Customer

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Customer name |
| `industry` | string | | Industry |
| `address` | string | | Address |
| `notes` | string | | Notes |
| `source` | string | | Lead source |
| `level` | `important` \| `normal` \| `low` | | Customer tier |

### Contact

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_id` | number | Yes | Parent customer ID |
| `name` | string | Yes | Contact name |
| `title` | string | | Job title |
| `phone` | string | | Phone number |
| `email` | string | | Email address |
| `wechat` | string | | WeChat ID |
| `is_primary` | `0` \| `1` | | Primary contact flag |
| `notes` | string | | Notes |

### Product

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Product name |
| `code` | string | | Product code |
| `category` | string | | Category |
| `price` | number | | List price |
| `unit` | string | | Unit |
| `description` | string | | Description |
| `status` | `active` \| `inactive` | | Status |

### Opportunity

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_id` | number | Yes | Customer ID |
| `title` | string | Yes | Opportunity title |
| `description` | string | | Description |
| `stage` | string | | Sales stage |
| `expected_amount` | number | | Expected value |
| `expected_close_date` | string | | Expected close date |
| `product_id` | number | | Linked product ID |
| `priority` | `high` \| `medium` \| `low` | | Priority |

### FollowUp

| Field | Type | Required | Description |
|---|---|---|---|
| `opportunity_id` | number | Yes | Opportunity ID |
| `content` | string | Yes | Follow-up notes |
| `follow_type` | `phone` \| `visit` \| `email` \| `wechat` \| `other` | Yes | Contact method |
| `follow_date` | string | Yes | Date of follow-up |
| `next_plan` | string | | Next action plan |

### Contract

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_id` | number | Yes | Customer ID |
| `contract_no` | string | Yes | Contract number |
| `title` | string | Yes | Contract title |
| `opportunity_id` | number | | Linked opportunity ID |
| `amount` | number | | Contract value |
| `status` | `draft` \| `active` \| `completed` \| `terminated` | | Status |
| `sign_date` | string | | Signing date |
| `start_date` | string | | Start date |
| `end_date` | string | | End date |
| `content` | string | | Contract notes |

### ServiceRequest

| Field | Type | Required | Description |
|---|---|---|---|
| `customer_id` | number | Yes | Customer ID |
| `title` | string | Yes | Request title |
| `description` | string | Yes | Issue description |
| `status` | `open` \| `in_progress` \| `resolved` \| `closed` | | Status |
| `priority` | `high` \| `medium` \| `low` | | Priority |
| `resolution` | string | | Manual resolution notes |

### FAQ

| Field | Type | Required | Description |
|---|---|---|---|
| `question` | string | Yes | Question text |
| `answer` | string | Yes | Answer text |
| `category` | string | | Category |
| `status` | `active` \| `inactive` | | Status |

## Typical Workflows

**Sales workflow:**
> Create customer → Add contact → Create opportunity → Log follow-ups → Sign contract

**Customer service workflow:**
> Create service request → AI reply auto-generated → Human review/resolve

**Knowledge base workflow:**
> Create/update FAQs → Semantic search by natural language query

## Notes

- All API requests must include `X-Company-Id` and `X-Api-Password` headers.
- Use **UTF-8 encoding** for all content. Python `requests` or Node.js `axios` are recommended; avoid Windows `curl` due to encoding issues.
- FAQ create/update/delete operations are automatically synced to the Chroma vector database.
- Creating a service request automatically triggers AI reply generation.

## License

MIT
