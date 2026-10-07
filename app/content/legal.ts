// Legal texts for the public pages. Have them reviewed before launch, and
// update LEGAL_UPDATED whenever the wording changes.
export const LEGAL_UPDATED = "October 2, 2026";

const OWNER = "Luka Rakić, doing business as DashClue";
const EMAIL = "[dashclue.contact@gmail.com](mailto:dashclue.contact@gmail.com)";

export const TERMS = `
These Terms of Service ("Terms") govern your use of the DashClue website and app ("Services"), operated by ${OWNER} ("we", "us", "our"), Niš, Serbia. By creating an account or using the Services, you agree to these Terms.

## 1. Who can use DashClue

You must be at least 18 years old. You agree to use the Services only for lawful purposes and in line with these Terms.

## 2. What DashClue does

DashClue uses artificial intelligence to suggest likely causes of car problems, how serious they may be, whether you could fix them yourself, and what repairs may cost. Answers are generated automatically from what you tell us and **may be wrong or incomplete**. Cost figures are rough estimates in US dollars and vary by region and repair shop.

**DashClue is not a mechanic and does not inspect your vehicle.** It is not a substitute for a professional inspection or repair.

## 3. Safety

Never rely on DashClue for a decision that affects your safety or the safety of others. If your brakes, steering, tyres or a warning light seem unsafe, stop driving and contact a qualified mechanic or roadside assistance. Only attempt a repair yourself if you have the skills, tools and protective equipment to do it safely.

## 4. Your account

You are responsible for keeping your login details secret and for everything done with your account. Give accurate information and tell us at ${EMAIL} if you think your account has been misused.

## 5. Plans and limits

- **Free:** a limited number of diagnostics per month, messages per diagnostic and vehicles, as shown in the app.
- **Pro:** a paid monthly subscription with higher or no limits, as shown on the pricing page.

We may change what each plan includes. If a change reduces what you pay for, we will tell you in advance and it will apply from your next billing period.

## 6. Payments and Paddle

Our order process is handled by our online reseller **Paddle.com**, which is the Merchant of Record for all orders. Paddle provides customer service for billing questions and handles returns. Paddle's [Buyer Terms](https://www.paddle.com/legal/buyer-terms) also apply to your purchase.

Pro renews automatically every month until you cancel. Prices are shown before you pay and may include taxes depending on your location. If we change the price, we will tell you before it applies to your next renewal.

## 7. Cancelling and refunds

You can cancel any time in **Settings → Subscription**. You keep Pro until the end of the period you already paid for, and you will not be charged again. Refunds are covered by our [Refund Policy](/refund-policy).

## 8. Your content

You keep ownership of what you type into DashClue, such as symptoms and questions. You give us permission to process it to provide the Services, including sending it to our AI provider to generate answers. Do not submit anything illegal, harmful, or other people's personal information.

## 9. Acceptable use

Do not misuse the Services, including by trying to break, overload or reverse engineer them, accessing them by automated means beyond normal use, or reselling access.

## 10. Ending your use

You can delete your account any time in **Settings → Account**. We may suspend or close accounts that break these Terms.

## 11. Intellectual property

The DashClue name, logo, website and software belong to Luka Rakić and are protected by intellectual property laws.

## 12. Disclaimers and liability

The Services are provided "as is" without warranties of any kind. To the maximum extent permitted by law, we are not liable for any indirect, incidental or consequential damages, or for any damage, injury or loss resulting from relying on AI-generated answers. Nothing in these Terms limits rights you have under consumer protection laws that cannot be excluded.

## 13. Changes

We may update these Terms. If a change is significant, we will tell you by email or in the app before it takes effect. Continuing to use the Services afterwards means you accept the updated Terms.

## 14. Governing law

These Terms are governed by the laws of the Republic of Serbia, without affecting the mandatory consumer protection rules of the country where you live.

## 15. Contact

Questions about these Terms: ${EMAIL}.
`;

export const PRIVACY = `
This Privacy Policy explains how ${OWNER} ("we", "us", "our") collects and uses personal data when you use the DashClue website and app ("Services"). We are the controller of your data and can be reached at ${EMAIL}, Niš 18000, Serbia.

## Summary

- We collect what you give us (email, name, car details, the problems you describe) and basic technical data.
- Your messages are sent to OpenAI to generate diagnoses. OpenAI does not use API data to train its models.
- Payments are handled by Paddle; we never see your card details.
- We do not sell your data and we do not use advertising trackers.
- You can delete your account and data any time in Settings.

## 1. What we collect

**You give us:**
- Account details: email address and password (stored as a secure hash, never in plain text)
- Profile: first name, last name and a generated avatar
- Vehicles: make, model, year, engine size and power
- Diagnostics: the problems you describe, your answers and the AI's replies
- Messages you send us by email

**Collected automatically:**
- IP address, browser type and request logs, used for security and rate limiting
- A login cookie that keeps you signed in (see our [Cookie Policy](/cookie-policy))

**From Paddle:** your subscription status, plan and billing dates. Paddle does not share your full card details with us.

## 2. Why we use it

| Purpose | Legal basis |
| --- | --- |
| Create your account and provide diagnoses | Performance of our contract with you |
| Process subscriptions and payments | Performance of contract |
| Send account emails (verification, password reset) | Performance of contract |
| Prevent abuse, fraud and attacks | Legitimate interests |
| Keep records required by tax and accounting law | Legal obligation |

We do not use your data for automated decisions that have legal or similarly significant effects on you.

## 3. Who we share it with

We share data only with service providers who help us run DashClue, under contracts that require them to protect it:

| Provider | What they do | Data involved |
| --- | --- | --- |
| OpenAI | Generates diagnoses | Your car details and the messages in a diagnostic chat |
| Paddle | Payments, invoices and tax (Merchant of Record) | Email, billing details, subscription |
| Resend | Sends account emails | Email address |
| Cloud hosting providers | Run our website, app and database | All data we store |
| DiceBear | Generates avatar images | Your IP address and a random seed when your avatar loads |

OpenAI does not use data sent through its API to train models, and keeps it for up to 30 days for abuse monitoring ([OpenAI API data policy](https://developers.openai.com/api/docs/guides/your-data)).

We may also disclose data if required by law. We never sell your personal data.

## 4. International transfers

Some providers process data outside Serbia and the European Economic Area, including in the United States. Where required, transfers rely on appropriate safeguards such as standard contractual clauses.

## 5. How long we keep it

- **Account, vehicles and diagnostics:** until you delete them or close your account.
- **When you close your account:** your vehicles, diagnostics, name and avatar are deleted immediately. We keep your email address and a closed-account record so billing records stay linked to an owner.
- **Billing records:** as long as tax and accounting laws require; Paddle keeps its own records as Merchant of Record.
- **Server logs:** up to 30 days.

## 6. Security

We use encryption in transit (HTTPS), hashed passwords, revocable sessions and rate limiting. No system is perfectly secure, so please use a strong, unique password.

## 7. Your rights

Depending on where you live, you can ask to access, correct, delete or export your data, object to or restrict processing, and withdraw consent. You can delete your account yourself in **Settings → Account**. For other requests, email ${EMAIL}; we reply within 30 days.

You can also complain to the Serbian Commissioner for Information of Public Importance and Personal Data Protection, or to the data protection authority where you live.

## 8. Children

DashClue is not for anyone under 18, and we do not knowingly collect their data.

## 9. Changes

If we change this policy in a significant way, we will tell you by email or in the app before the change applies.
`;

export const REFUND = `
We want DashClue Pro to be worth it. If it isn't, here is how refunds work.

## Payments are handled by Paddle

Our order process is conducted by our online reseller **Paddle.com**, the Merchant of Record for all orders. Paddle processes refund requests on our behalf.

## 14-day refund on your first payment

If you are not happy with Pro, you can ask for a full refund within **14 days of your first payment**. No questions asked.

## Renewals

You can cancel any time in **Settings → Subscription**, and you will not be charged again. You keep Pro until the end of the month you paid for. We do not give partial refunds for unused time in a renewal period, except where the law requires it.

## Billing mistakes

If you were charged twice, charged after cancelling, or charged the wrong amount, we will refund the incorrect charge in full.

## How to ask for a refund

Email ${EMAIL} with the email address on your account, or use the link in your Paddle receipt. Approved refunds go back to your original payment method, usually within 5–10 business days.

Your statutory rights as a consumer are not affected by this policy.
`;

export const COOKIES = `
This Cookie Policy explains which cookies ${OWNER} uses on DashClue.

## Cookies we use

| Cookie | Set by | Purpose | Duration |
| --- | --- | --- | --- |
| auth_token | DashClue | Keeps you signed in. Not readable by page scripts. | 30 days, or until you sign out |
| Checkout cookies | Paddle | Run the checkout and help prevent payment fraud. Only set when you open the upgrade checkout. | Set by Paddle ([Paddle privacy notice](https://www.paddle.com/legal/privacy)) |

We only use cookies that are **strictly necessary** for the service you ask for, so we do not show a consent banner. We do not use advertising or tracking cookies.

## Managing cookies

You can block or delete cookies in your browser settings. If you block the login cookie, you will not be able to sign in.

## Changes

If we add other cookies, such as analytics, we will update this page and ask for consent where the law requires it.

## Contact

Questions about cookies: ${EMAIL}.
`;
