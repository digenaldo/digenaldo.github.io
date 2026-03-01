---
title: "Distillation Attack on LLMs (Model Extraction via Knowledge Distillation)"
date: 2026-03-01
draft: false
tags: ["security", "llm", "model-extraction", "distillation", "api-security"]
categories: ["Security"]
---

## What is a Distillation Attack?

In normal machine learning, **knowledge distillation** is a training method. A large "teacher" model teaches a smaller "student" model. The student learns to copy the teacher's outputs. This makes the student faster and cheaper to run (Hinton et al., 2015).

In a **distillation attack**, the attacker uses distillation to steal a model. The attacker has access to a black-box API. The API is the teacher. The attacker sends queries to the API. The API returns outputs. The attacker uses these query-output pairs to train a student model. The student model copies the teacher's behavior. This is also called **model extraction** or **model stealing** (Tramèr et al., arXiv:1609.02943).

The attacker does not see the teacher's weights or architecture. The attacker only sees inputs and outputs. But this is enough to build a copy.

---

## Threat Model and Why It Matters

### What the Attacker Has

- **Black-box API access**: The attacker can send queries and get responses. The attacker cannot see the model's code or weights.
- **Budget**: The attacker has money to pay for API calls. Some APIs are free or cheap. Others cost more.
- **Rate limits**: Most APIs limit how many queries you can send per minute or per day.
- **Time**: The attacker can run the attack over days or weeks.

### What the Attacker Wants

- **Copy the model's capabilities**: The attacker wants a model that works like the original. The copy can answer questions, write code, or classify text.
- **Reduce cost**: The attacker wants to avoid paying for API calls. A local copy is cheaper.
- **Bypass restrictions**: Some APIs have safety filters or usage rules. A stolen copy may not have these filters.
- **Resell or compete**: The attacker may sell the copy or use it to compete with the original service.

### Why This Matters

- **Intellectual property risk**: The model is expensive to build. Stealing it harms the owner.
- **Safety risk**: If the attacker removes safety filters, the copy can produce harmful content.
- **Revenue loss**: Users may switch to the cheaper stolen copy.

Model extraction is a real threat. Researchers have shown it works on many systems (Tramèr et al., arXiv:1609.02943; Orekondy et al., arXiv:1812.02766).

---

## How the Attack Works (High Level)

The attack has four main phases:

1. **Query planning**: The attacker decides what queries to send. Good queries cover many topics and styles.
2. **Data collection**: The attacker sends queries to the API. The API returns outputs. The attacker saves these pairs.
3. **Student training**: The attacker trains a student model. The student learns to match the teacher's outputs.
4. **Evaluation**: The attacker tests the student. If the student is good enough, the attack succeeds. If not, the attacker collects more data.

![Teacher-Student Distillation Flow](/images/distillation-image1.png)
*The attacker sends queries to the teacher API. The API returns outputs. The attacker uses these pairs to train a student model.*

![Attacker Loop with Rate Limits](/images/distillation-image2.png)
*Attackers manage rate limits by waiting or using multiple accounts. They cache all responses to avoid losing data.*

---

## Key Technical Details (Queries, Outputs, Loss, and Data)

### Output Richness

The more information the API returns, the easier the attack. There are different levels of output:

- **Hard labels**: The API returns only the final answer. Example: "Class A" or "Yes".
- **Soft targets**: The API returns probabilities or confidence scores. Example: "Class A: 80%, Class B: 15%, Class C: 5%".
- **Full text**: For LLMs, the API returns complete sentences or paragraphs.
- **Logits or token probabilities**: Some APIs expose the raw scores for each token. This makes extraction much easier.

Tramèr et al. (arXiv:1609.02943) showed that confidence scores help attackers. The attacker can train a better student when the teacher shares more detail.

![Soft Targets vs Hard Labels](/images/distillation-image3.png)
*Hard labels give only the final answer. Soft targets give probabilities. Soft targets help attackers train better copies.*

### Query Diversity

The attacker needs queries that cover the model's behavior. If the attacker only asks about one topic, the student will only learn that topic. Good query sets include:

- Different topics (science, history, code, etc.).
- Different styles (formal, casual, technical).
- Different lengths (short questions, long prompts).
- Edge cases (unusual inputs, rare words).

Attackers often use public datasets or generate synthetic queries. Knockoff Nets (Orekondy et al., arXiv:1812.02766) showed that attackers can use random or unrelated data to steal image classifiers. The same idea works for LLMs.

### Distillation Objective

The student model learns by copying the teacher's outputs. The training loss measures how close the student is to the teacher. A simple version is:

**Loss = distance(student_output, teacher_output)**

For classification, this might be cross-entropy loss. For LLMs, this might be token-level loss. The student tries to predict the same tokens as the teacher.

The attacker does not need the teacher's weights. The attacker only needs the outputs. This is why distillation works as an attack.

---

## What Makes LLMs Special (Compared to Classic Model Stealing)

LLMs are different from older models like image classifiers. This changes how extraction works.

### Large Output Space

LLMs generate text. Text has millions of possible outputs. This makes it harder to cover all behaviors. But it also means each query gives a lot of information. A single prompt can return hundreds of tokens.

### Prompt Sensitivity

LLMs respond to small changes in prompts. Attackers can use prompt engineering to explore the model. For example, the attacker can ask the model to "explain step by step" or "list all options". This extracts more knowledge.

### System Prompts and Tool Use

Many LLM APIs use hidden system prompts. These prompts control the model's behavior. Attackers try to extract these prompts. Some LLMs can call external tools (search, calculator). Attackers may try to steal this functionality too.

### Partial Extraction and Parameter Recovery

Some attacks go further. They try to recover the model's actual parameters. Carlini et al. (arXiv:2403.06634) showed that attackers can steal parts of a production LLM. They used the API to extract information about the model's weights. This is a different type of attack. It is harder but more powerful.

For a full overview of LLM extraction methods, see the survey by Zhang et al. (arXiv:2506.22521). It covers many attack types and defenses.

---

## Defenses and Mitigations (With Trade-offs)

No single defense stops all attacks. API owners should use multiple layers. Here are the main defenses.

### 1. Output Restriction

**What it is**: Limit what the API returns. Do not expose logits or token probabilities. Return only the final text.

**Benefit**: Makes extraction harder. Attackers get less information per query.

**Cost**: Some legitimate users need probabilities for their applications. Restricting output may hurt usability.

### 2. Watermarking and Fingerprinting

**What it is**: Add hidden patterns to the model's outputs. If someone uses a stolen copy, you can detect the watermark.

**Benefit**: Helps you prove that a model is stolen. Can deter attackers.

**Cost**: Watermarks may reduce output quality. Attackers may try to remove watermarks. DAWN (Szyller et al., arXiv:1906.00830) proposes dynamic watermarking at the API level. This makes removal harder.

### 3. Query Detection

**What it is**: Monitor queries for suspicious patterns. Flag users who send many similar queries or cover unusual topics.

**Benefit**: Can catch attacks in progress. You can block the attacker before they finish.

**Cost**: Needs good anomaly detection. May have false positives. PRADA (Juuti et al., arXiv:1805.02628) suggests using prediction statistics to detect extraction. But this requires careful tuning.

### 4. Throttling and Rate Limits

**What it is**: Limit how many queries each user can send. Use stricter limits for free accounts.

**Benefit**: Slows down attackers. Makes extraction more expensive.

**Cost**: May frustrate legitimate users. Attackers can use multiple accounts to bypass limits.

### 5. Abuse Monitoring

**What it is**: Track user behavior over time. Look for accounts that send high volumes of queries or use automation.

**Benefit**: Catches persistent attackers. Can combine with other signals (payment method, IP address).

**Cost**: Requires logging and analysis. May raise privacy concerns.

### 6. Anomaly Detection

**What it is**: Use machine learning to find unusual query patterns. For example, queries with very high diversity or low semantic coherence.

**Benefit**: Can detect sophisticated attacks. Works even if attackers vary their behavior.

**Cost**: Hard to tune. May have false positives. Needs ongoing updates.

![Defenses Map (Attack Phases vs Controls)](/images/distillation-image4.png)
*Different defenses work at different attack phases. API owners should use multiple layers to cover all phases.*

---

## Practical Checklist for API Owners

Here are specific steps you can take to protect your LLM API:

1. **Do not expose logits or token probabilities** unless absolutely necessary. Return only final text.
2. **Set rate limits** for all users. Use stricter limits for free or new accounts.
3. **Log all queries** with metadata: user ID, timestamp, query length, response length, IP address.
4. **Monitor query diversity** per user. Flag accounts that send queries on many unrelated topics in a short time.
5. **Track prompt similarity**. If a user sends many nearly identical prompts, investigate.
6. **Measure output entropy**. Very low entropy (repetitive outputs) may signal automated extraction.
7. **Watch for burst patterns**. Attackers often send queries in bursts to maximize speed.
8. **Use account verification**. Require email, phone, or payment method. This makes it harder to create many accounts.
9. **Implement anomaly detection**. Use machine learning to find unusual behavior. Update your models regularly.
10. **Consider watermarking**. Embed hidden patterns in outputs. Test that watermarks do not hurt quality.
11. **Review your terms of service**. Make it clear that model extraction is forbidden. This helps with legal action.
12. **Plan for false positives**. Some legitimate users (researchers, power users) may trigger alerts. Have a process to review and whitelist them.

**Privacy warning**: Logging and monitoring can collect sensitive data. Follow privacy laws. Tell users what you log. Give users control over their data.

---

## References (arXiv)

1. Tramèr, F., Zhang, F., Juels, A., Reiter, M. K., & Ristenpart, T. (2016). Stealing Machine Learning Models via Prediction APIs. *arXiv:1609.02943*. https://arxiv.org/abs/1609.02943

2. Orekondy, T., Schiele, B., & Fritz, M. (2018). Knockoff Nets: Stealing Functionality of Black-Box Models. *arXiv:1812.02766*. https://arxiv.org/abs/1812.02766

3. Juuti, M., Szyller, S., Marchal, S., & Asokan, N. (2018). PRADA: Protecting against DNN Model Stealing Attacks. *arXiv:1805.02628*. https://arxiv.org/abs/1805.02628

4. Szyller, S., Atli, B. G., Marchal, S., & Asokan, N. (2019). DAWN: Dynamic Adversarial Watermarking of Neural Networks. *arXiv:1906.00830*. https://arxiv.org/abs/1906.00830

5. Carlini, N., Jagielski, M., Choquette-Choo, C. A., Paleka, D., Pearce, W., Anderson, H., Terzis, A., Thomas, K., & Tramèr, F. (2024). Stealing Part of a Production Language Model. *arXiv:2403.06634*. https://arxiv.org/abs/2403.06634

6. Zhang, Y., Gao, R., Huang, J., & Xu, Q. (2025). A Survey on Model Extraction Attacks and Defenses for Large Language Models. *arXiv:2506.22521*. https://arxiv.org/abs/2506.22521

7. Hinton, G., Vinyals, O., & Dean, J. (2015). Distilling the Knowledge in a Neural Network. *arXiv:1503.02531*. https://arxiv.org/abs/1503.02531

---

**Conclusion**: Distillation attacks are a real threat to LLM APIs. Attackers can copy expensive models using only black-box access. API owners must use multiple defenses: output restrictions, rate limits, monitoring, and watermarking. No defense is perfect. But layers of protection make attacks harder and more expensive. Stay informed about new attack methods. Update your defenses regularly.
