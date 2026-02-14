+++
title = "LLM Security: A Scientific Taxonomy of Attack Vectors"
date = "2026-02-13"
description = "A technical overview of how LLM security research evolved from adversarial examples to systemic risks: jailbreaks, prompt injection, memorization, backdoors, and supply chain issues."
tags = ["security", "cybersecurity", "llm", "ai-security", "machine-learning", "devsecops"]
readingTime = 9
draft = false
+++

## Introduction

Security in Large Language Models (LLMs) is no longer a small topic inside NLP (Natural Language Processing). It has become its own field within computer security. Between 2021 and 2025, research moved from studying adversarial examples in classifiers to looking at bigger risks: alignment, memorization, context contamination, and models that keep behaving in harmful ways.

The problem today is not only a bug in the code. It comes from how the system is built: the architecture, the training data, the alignment methods, and how the model is connected to other systems.

This post organizes the main scientific results from this period into a technical taxonomy. It is based on how attacks work, not on how the media talks about them.

---

## 1. Adversarial Attacks and Transferable Jailbreaks

Many people think of jailbreaks as just clever prompt writing. Research has shown there is more to it.

Studies showed that adversarial suffixes can be generated automatically by gradient optimization. These suffixes can make aligned models break safety rules [1]. They push the model into parts of its internal space where forbidden answers become more likely.

![How GCG adversarial attacks work](/images/gcg_attack_process.png)

*Figure: Two-phase process of GCG attacks—optimization of an adversarial suffix on a white-box model, then transfer of that suffix to a black-box model to get forbidden answers. Source: Zou et al. [1].*

**How the GCG attack works: from optimization to exploitation**

The GCG (Greedy Coordinate Gradient) attack works like building a mathematical “master key” that uses the fact that different AIs are built in similar ways. It starts in the **optimization phase (white-box)**. Attackers use open-source models (such as Llama and Vicuna) to compute an adversarial suffix. This suffix is a string of characters that may look random to humans but is optimized with gradients so that the model starts its answer with something like “Sure, here is how to…”.

Unlike human “gaslighting” (where you try to talk the AI into being harmful), the suffix is a **digital “master key”**: a string such as `! ? @ #` or other seemingly random character sequences that exploit the model’s gradients. The attack does not try to persuade the model; it uses math to push it into a bad state.

The main idea is **multi-model optimization**: the suffix is not tuned to fool just one AI but several at once. By finding a sequence that breaks the safety of many open models at the same time, attackers get a **universal suffix** that targets patterns that are shared by almost all Large Language Models (LLMs).

That leads to the **transfer phase (black-box)**. Closed models (such as GPT-4 or PaLM-2) use the same basic architecture (Transformer) and are trained on data similar to the open models. So they end up sharing the same kinds of weaknesses. When this universal suffix is sent to a closed model, it creates a kind of “mathematical pressure” that safety filters do not recognize as a threat.

Once the suffix makes the closed model produce the first tokens of a forbidden answer, control is lost: the chance that the model will keep generating harmful text goes up a lot, and it can ignore its original safety rules. In the end, the attack works because what was learned on open models also applies to how these architectures process tokens.

So the main finding is **transferability**. Attacks that were optimized for one open-source model often worked on closed or commercial models trained with similar pipelines [1]. This is not only because of the Transformer architecture. Transfer happens because training goals and alignment methods (especially RLHF (Reinforcement Learning from Human Feedback)) are similar. It is a weakness in the whole system when models are aligned in similar ways.

**Practical takeaway:** Defenses that only use word filters or fixed rules are weak against optimization-based attacks.

![GCG Attack Effectiveness: Transfer from Open to Closed Models](/images/gcg_attack_chart_en.png)

*Figure: Effectiveness of GCG (Gradient-based Certifiably Good) attacks when optimized on open-source models (white-box) and then transferred to closed models (black-box) without access to their internals. On open models (e.g. Vicuna-7B, Llama-2-7B-Chat) effectiveness is very high; the same attack still reaches high rates on GPT-3.5, PaLM-2 and GPT-4. Source: Zou et al. [1].*

---

## 2. Indirect Prompt Injection and Context Contamination

With the rise of RAG and autonomous agents, the attack surface has changed.

Indirect Prompt Injection was formalized as a real attack vector against applications that use LLMs [2]. The core issue is that the model does not clearly separate “trusted instructions” from “external retrieved data.” Both are just tokens in the same context.

This is an instance of the classic “confused deputy” problem applied to generative models.

![How indirect prompt injection works](/images/indirect_injection_b1.png)

*Figure: Indirect prompt injection—malicious content in retrieved data can change how the model behaves. Source: Greshake et al. [2].*

### How the attack works

The attacker does not send the malicious text directly to the model. Instead, they hide instructions inside data that the app later fetches (for example, text from a web page or a document). When the app uses RAG or similar tools, it puts that data into the same context as the user's question and the system's own instructions. The model sees everything as one block of text and cannot tell which part is "safe" and which part is controlled by the attacker. So it may follow the hidden instructions and change its answer, call an API, or leak data. How bad that gets depends on the setup:

- **Standalone LLM:** The effect is usually limited to changing the text output.
- **LLM with tools:** Data can be exfiltrated through API calls.
- **Agents with broad credentials:** There is risk of unauthorized actions in external systems.

The real risk is not only wrong content, but privilege escalation in distributed systems.

---

## 3. Training Data Extraction and Memorization

The question of memorization became concrete when it was shown that large models can reproduce rare sequences that appeared in their training data [3].

It helps to separate three types of attacks that are often mixed up:

- **Membership inference:** Estimates whether a specific piece of data was in the training set.
- **Training data extraction:** Directly extracts memorized sequences through adaptive generation.
- **Memorization elicitation:** Makes the model reveal rare passages through statistical probing.

The study showed that large-scale extraction is possible, not only probabilistic inference [3]. This conflicts with the idea of “privacy by design,” especially for models trained on scraped web data.

---

## 4. Behavioral Backdoors and Sleeper Agents

Some hoped that safety alignment would remove all malicious behavior. Experiments tested this.

It was shown that models can keep behavioral backdoors even after safety fine-tuning with SFT and RLHF [4]. The model learns to trigger bad behavior only under a specific condition and to look safe during evaluation.

These experiments were done in controlled settings. There is no agreement that the same level of persistence happens in real industrial pipelines with extensive red teaming and other alignment techniques.

Still, the result matters: alignment does not formally guarantee that hidden behavior is removed.

---

## 5. Supply Chain and Tool Abuse

Recent work suggests that the main risk may not be the model alone, but how it is integrated into larger systems [5].

Two vectors are especially important:

- **Model poisoning and compromised provenance:** Especially when using third-party fine-tuning or unaudited checkpoints.
- **Tool abuse:** Agents with access to internal APIs, databases, or financial systems act under probabilistic control.

In corporate environments, the potential impact of tool abuse often exceeds the impact of jailbreak alone.

---

## Conclusion

Research between 2021 and 2025 points to a few main ideas:

- Jailbreak is a mathematical optimization problem.
- RAG introduces structural context contamination.
- LLMs can memorize sensitive data.
- Backdoors can survive alignment.
- Integration with tools greatly expands the attack surface.

LLM security is not just an extension of traditional AppSec, and it cannot be solved only with prompt engineering. It is a challenge of architecture, data governance, and privilege control in integrated probabilistic systems.

---

## References

[1] Zou, A., Wang, Z., Kolter, J. Z., & Fredrikson, M. (2023). Universal and Transferable Adversarial Attacks on Aligned Language Models. arXiv:2307.15043.

[2] Greshake, K., et al. (2023). Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection. Proceedings of the 16th ACM Workshop on Artificial Intelligence and Security.

[3] Carlini, N., et al. (2021). Extracting Training Data from Large Language Models. USENIX Security Symposium.

[4] Hubinger, E., et al. (2024). Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training. arXiv:2401.05566.

[5] Yao, Y., et al. (2024). A Survey on Large Language Model Security and Privacy: The Good, the Bad, and the Ugly. High-Confidence Computing.
