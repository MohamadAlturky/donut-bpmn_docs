---
sidebar_position: 1
---

# Activity extraction

this is one of the answers that the llm returns.

## The Input

```json
"process_description": """
                                 Consider a process for purchasing items
                                 from an online shop. The user starts an order by logging in to their account.
                                 Then, the user simultaneously selects the items to purchase and sets a payment
                                 method. Afterward, the user either pays or completes an installment agreement.
                                 Since the reward value depends on the purchase value,
                                 After selecting the items, the user chooses between multiple options for a free reward.
                                 this step is done after selecting the items,
                                 but it is independent of the payment activities.
                                 Finally, the items are delivered. The user has the right to
                                 return items for exchange. Every time items are returned,
                                 a new delivery is made.
                               """
```

## The Output

```json
{
  "activities": [
    "Login",
    "Select Items",
    "Set Payment Method",
    "Pay",
    "Complete Installment Agreement",
    "Choose Reward Option",
    "Deliver Items",
    "Return Item for Exchange"
  ]
}
```
