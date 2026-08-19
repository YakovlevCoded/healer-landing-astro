/**
 * Programmatic TSH-value pages.
 *
 * Targets the long-tail "tsh 8.8", "tsh 4.8 means", "tsh over 100" pattern — queries where
 * GSC already shows impressions at positions 49-61 with NO dedicated page, versus 78-95 for
 * head terms like "high tsh". Nobody owns these queries, so they're winnable without authority.
 *
 * ANTI-THIN-CONTENT DESIGN (this is the whole point of the file):
 *  - 15 NARROW segments, not 7 broad bands. A first pass used 7 and produced 13 pages in the
 *    4-10 range sharing word-for-word prose (measured jaccard 1.00) — exactly what Google's
 *    scaled-content-abuse policy targets.
 *  - At most 2 values per segment, so no more than two pages ever share a narrative.
 *  - VALUES is deliberately short. For TSH 4.5 vs 4.8 the medical meaning is genuinely
 *    identical, which argues for fewer pages, not more padding.
 *  - Each segment carries its own `meaning`, `causes`, `treatment`, `alongside` and `urgency`.
 *  - On top of that, each page computes value-specific arithmetic (distance to each threshold,
 *    multiple of the upper limit, what a move either way would mean).
 *
 * Thresholds follow the ranges already cited across the thyroid cluster:
 * reference 0.4-4.0 mIU/L, 4-10 subclinical hypothyroid, >10 overt, <0.4 possible hyper.
 */

export const REF_LOW = 0.4;
export const REF_HIGH = 4.0;
export const TREAT_HIGH = 10.0;

export interface Band {
  id: string;
  min: number;
  max: number;
  label: string;
  verdict: string;
  meaning: string[];
  causesHeading: string;
  causes: string[];
  treatment: string;
  alongside: string[];
  urgency: string;
  links: { href: string; text: string }[];
  refs: { text: string; href: string }[];
}

const REF_NIDDK = { text: 'National Institute of Diabetes and Digestive and Kidney Diseases. Hypothyroidism.', href: 'https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism' };
const REF_ATA_HYPO = { text: 'American Thyroid Association. Hypothyroidism.', href: 'https://www.thyroid.org/hypothyroidism/' };
const REF_ATA_HYPER = { text: 'American Thyroid Association. Hyperthyroidism.', href: 'https://www.thyroid.org/hyperthyroidism/' };
const REF_STAT_TSH = { text: 'Pierce E, et al. Physiology, Thyroid Stimulating Hormone. StatPearls, NCBI.', href: 'https://www.ncbi.nlm.nih.gov/books/NBK499850/' };
const REF_SUBCLIN = { text: 'Subclinical Hypothyroidism. StatPearls, NCBI.', href: 'https://www.ncbi.nlm.nih.gov/books/NBK536970/' };
const REF_JCEM = { text: 'Ettleson MD, et al. Trends in Prevalence of Thyroid Dysfunction. J Clin Endocrinol Metab.', href: 'https://academic.oup.com/jcem/article/109/2/e657/7279439' };
const REF_ENDOTEXT = { text: 'Spencer CA. Assay of Thyroid Hormone and Related Substances. Endotext, NCBI.', href: 'https://www.ncbi.nlm.nih.gov/books/NBK279113/' };

const L_HYPER = { href: '/blog/hyperthyroidism-tsh/', text: 'why hyperthyroidism shows a low TSH, not a high one' };
const L_ULTRA = { href: '/blog/ultrasensitive-tsh/', text: 'what an ultrasensitive TSH assay actually measures' };
const L_FT34 = { href: '/blog/free-t3-t4-explained/', text: 'free T3 and free T4 explained' };
const L_HUB = { href: '/blog/high-tsh-thyroid-explained/', text: 'high TSH: what your thyroid is telling you' };
const L_CAUSES = { href: '/blog/high-tsh-causes/', text: 'the common causes of an elevated TSH' };
const L_SYMPT = { href: '/blog/high-tsh-symptoms/', text: 'what an underactive thyroid feels like' };
const L_TPO = { href: '/blog/thyroid-antibodies-tpo/', text: "testing for Hashimoto's with TPO antibodies" };
const L_100 = { href: '/blog/tsh-over-100/', text: 'what a TSH over 100 means' };
const L_TIRED = { href: '/blog/always-tired-blood-markers/', text: 'the six markers behind most persistent fatigue' };
const L_FERR = { href: '/blog/low-ferritin-guide/', text: 'what low ferritin actually means' };
const L_CHOL = { href: '/blog/cholesterol-numbers-explained/', text: 'why an underactive thyroid raises cholesterol' };

export const BANDS: Band[] = [
  {
    id: 'undetectable',
    min: 0,
    max: 0.03,
    label: 'Effectively undetectable',
    verdict: 'at the very floor of what an assay can measure',
    meaning: [
      'A TSH this low is at the bottom edge of what laboratory equipment can quantify at all. Your pituitary has stopped signalling almost entirely, which it only does when it detects a substantial excess of circulating thyroid hormone.',
      'The reason a number this small can even be printed is that third-generation assays measure reliably down to roughly 0.01 mIU/L. On an older analyser this result would simply have read "undetectable", with no way to tell it apart from a value ten times higher.',
    ],
    causesHeading: 'What produces a fully suppressed TSH',
    causes: [
      "**Graves' disease** — the autoimmune driver behind most hyperthyroidism",
      '**A toxic nodule** producing hormone independently of the pituitary',
      '**Significant over-replacement** with levothyroxine or liothyronine',
      '**Recent thyroiditis** releasing a large bolus of stored hormone',
    ],
    treatment:
      'A result this suppressed is investigated rather than monitored. What happens next hinges on free T4 and free T3 and on whether you take thyroid medication — the same figure means one thing as a medication side effect and quite another in someone untreated.',
    alongside: [
      '**Free T4 and free T3** — to establish how much excess hormone is actually present',
      "**TSH-receptor antibodies** — the specific marker for Graves' disease",
      '**Your current thyroid medication dose**, which is the most easily corrected cause',
    ],
    urgency:
      'Get this reviewed promptly, particularly with a fast or irregular heartbeat, tremor, or unexplained weight loss. Severe untreated hyperthyroidism carries cardiac risk.',
    links: [L_HYPER, L_ULTRA, L_FT34],
    refs: [REF_ATA_HYPER, REF_ENDOTEXT, REF_STAT_TSH],
  },
  {
    id: 'deeply-suppressed',
    min: 0.03,
    max: 0.1,
    label: 'Deeply suppressed',
    verdict: 'far below the reference range',
    meaning: [
      'At this level the pituitary has essentially switched off its request for more thyroid hormone. It is a clear signal rather than an ambiguous one: something is supplying more hormone than your body needs.',
      'Values in this stretch matter clinically because the distinction between a mildly low TSH and a deeply suppressed one changes how aggressively an overactive thyroid is treated. That distinction only became measurable when assays improved enough to resolve differences below 0.1.',
    ],
    causesHeading: 'What pushes TSH this far down',
    causes: [
      "**Overt hyperthyroidism**, most often Graves' disease",
      '**Toxic multinodular goitre**, especially in older adults',
      '**Excess thyroid medication**, including unintentional double-dosing',
      '**Large iodine exposure**, such as contrast dye or high-dose kelp supplements',
    ],
    treatment:
      'Treatment is usually indicated once hormone levels confirm an overactive thyroid, and options range from antithyroid drugs to radioiodine or surgery depending on cause and age. If the explanation is your levothyroxine dose, a reduction is typically all that is needed.',
    alongside: [
      '**Free T4 and free T3** — raised levels confirm overt hyperthyroidism',
      '**TSH-receptor antibodies** to identify the autoimmune form',
      '**Heart rate and an ECG if palpitations are present**, since rhythm problems are the main risk',
    ],
    urgency:
      'This deserves an appointment soon rather than a routine recheck, especially over the age of 60 or with any existing heart condition.',
    links: [L_HYPER, L_FT34, L_ULTRA],
    refs: [REF_ATA_HYPER, REF_STAT_TSH],
  },
  {
    id: 'clearly-low',
    min: 0.1,
    max: 0.3,
    label: 'Clearly below range',
    verdict: 'below the reference range',
    meaning: [
      'This sits well under the bottom of the reference range but not at the floor of the assay. When thyroid hormone itself is still normal, this is subclinical hyperthyroidism — the pituitary has backed off, yet output has not obviously overshot.',
      'The practical question at this level is whether the picture is stable. A fair proportion of mildly suppressed readings drift back into range on their own, so the sequence of results usually matters more than the first one.',
    ],
    causesHeading: 'What can put TSH in this range',
    causes: [
      '**Early or mild hyperthyroidism**, often from a small autonomous nodule',
      '**Slightly generous thyroid replacement** — very common in treated patients',
      '**Resolving thyroiditis**, where levels overshoot before settling',
      '**Pregnancy**, where a lower TSH is expected in the first trimester',
    ],
    treatment:
      'Often no treatment initially. The standard approach is to repeat the test with free T4 after a few weeks to a few months and treat only if hormone levels rise, symptoms appear, or you fall into a higher-risk group such as older adults with osteoporosis or atrial fibrillation.',
    alongside: [
      '**Free T4 and free T3** — normal values keep this in the subclinical category',
      '**A repeat TSH** after several weeks, since single readings fluctuate',
      '**Bone density and heart rhythm review** if the suppression persists in an older adult',
    ],
    urgency:
      'Rarely urgent by itself. Palpitations, tremor or weight loss change the picture, and so does a value that keeps drifting downward across tests.',
    links: [L_HYPER, L_FT34, L_HUB],
    refs: [REF_ATA_HYPER, REF_STAT_TSH],
  },
  {
    id: 'borderline-low',
    min: 0.3,
    max: REF_LOW,
    label: 'Just below range',
    verdict: 'a shade under the reference range',
    meaning: [
      'This is the mildest possible abnormal result on the low side — close enough to the boundary that some laboratories, using a slightly different reference interval, would report it as normal.',
      'Because TSH varies through the day and between labs, a value this close to the cut-off is frequently just noise. It is one of the few results where "repeat it and see" is genuinely the best medicine rather than a delay tactic.',
    ],
    causesHeading: 'Why TSH lands just under the line',
    causes: [
      '**Normal day-to-day variation** — TSH is lowest in the afternoon and evening',
      '**A different reference interval** at the testing laboratory',
      '**Very early or mild thyroid overactivity**',
      '**Thyroid medication set slightly high**',
      '**Recent illness or corticosteroids**, both of which transiently lower TSH',
    ],
    treatment:
      'No treatment for a result this marginal. A repeat in a few months, ideally drawn at a similar time of day and at the same laboratory, resolves most cases without anything further.',
    alongside: [
      '**Free T4** — the test that decides whether this means anything at all',
      '**A repeat TSH**, same lab, same time of day',
    ],
    urgency:
      'Not urgent. Worth mentioning at your next appointment rather than making a separate one, unless you have symptoms of an overactive thyroid.',
    links: [L_HYPER, L_FT34, L_ULTRA],
    refs: [REF_STAT_TSH, REF_ATA_HYPER],
  },
  {
    id: 'low-normal',
    min: REF_LOW,
    max: 1.0,
    label: 'Low end of normal',
    verdict: 'in the lower part of the normal range',
    meaning: [
      'This is a normal result sitting toward the lower end of the range. For most people it means the thyroid is producing hormone comfortably and the pituitary has no need to push.',
      'One context changes how this is read: if you take levothyroxine, a TSH down here can indicate a dose slightly higher than you need, since replacement often aims for the middle of the range rather than the bottom. Untreated, it is simply a healthy number.',
    ],
    causesHeading: 'What a result here usually reflects',
    causes: [
      '**Normal thyroid function** with a naturally lower set point',
      '**Thyroid replacement dosed toward the higher end** of what you need',
      '**Time of day** — afternoon and evening draws run lower',
      '**No indication of an underactive thyroid**, which is the main thing this rules out',
    ],
    treatment:
      'Nothing to treat. If you take thyroid medication and feel over-stimulated — jittery, sleeping poorly, heart racing — it is worth reviewing the dose against this result rather than assuming it is unrelated.',
    alongside: [
      '**Free T4**, if you take thyroid medication, to check you are not over-replaced',
      '**Ferritin, vitamin D and B12** if you have symptoms, since a normal TSH points elsewhere',
    ],
    urgency:
      'No urgency. This is a reassuring thyroid result; persistent symptoms need a different line of enquiry.',
    links: [L_TIRED, L_FT34, L_FERR],
    refs: [REF_NIDDK, REF_STAT_TSH],
  },
  {
    id: 'mid-normal',
    min: 1.0,
    max: 2.0,
    label: 'Mid-normal',
    verdict: 'squarely in the middle of the normal range',
    meaning: [
      'This is about as unremarkable as a TSH gets, and it is where most healthy adults land. The feedback loop between pituitary and thyroid is balanced: the signal being sent matches the hormone being made.',
      'It is also the range replacement therapy usually targets, so if you take levothyroxine, a result here generally means the dose is right.',
      'Which makes the useful question a different one. If you had this test because of fatigue, weight change or brain fog, a mid-normal TSH is fairly strong evidence the thyroid is not the culprit — and the most common actual culprits are low iron stores, low vitamin D, low B12 and blood-sugar problems, all of which are cheap to check and routinely missed.',
    ],
    causesHeading: 'What this result tells you',
    causes: [
      '**Thyroid regulation is working normally**',
      '**Replacement therapy is well dosed**, if you take it',
      '**Symptoms need another explanation** — iron, vitamin D, B12 or metabolic markers',
      '**Autoimmunity is still possible** — TPO antibodies can be positive years before TSH shifts',
    ],
    treatment:
      'No thyroid treatment is indicated. If symptoms persist, the productive step is widening the panel rather than re-testing this number repeatedly.',
    alongside: [
      '**Ferritin** — low iron stores mimic thyroid symptoms and are far more common',
      '**Vitamin D and B12** — both produce fatigue and brain fog',
      '**HbA1c and fasting insulin** — for the metabolic side of low energy',
      '**TPO antibodies** if thyroid disease runs in your family',
    ],
    urgency:
      'None. The point of a result like this is to stop looking at the thyroid and start looking elsewhere.',
    links: [L_TIRED, L_FERR, L_TPO],
    refs: [REF_NIDDK, REF_STAT_TSH],
  },
  {
    id: 'upper-mid-normal',
    min: 2.0,
    max: 2.6,
    label: 'Upper-middle of normal',
    verdict: 'normal, just above the midpoint',
    meaning: [
      'Still a normal result, sitting a little above the middle of the range. Nothing about this value calls for action on its own.',
      'It is worth knowing that this is roughly where the argument starts. Some clinicians treat the whole range up to 4.0 as equivalent; others watch anything above about 2.5 more closely, on the reasoning that reference ranges were built from populations that included undiagnosed thyroid disease. Neither position is settled, and a single value in this stretch does not resolve it.',
    ],
    causesHeading: 'What a value here reflects',
    causes: [
      '**Ordinary variation** within a normal thyroid',
      '**An early upward drift**, which only repeat testing can distinguish from the above',
      '**Morning draws**, which run higher than afternoon ones',
      '**Recovery from recent illness**, briefly nudging TSH up',
    ],
    treatment:
      'No treatment. If you have a family history of thyroid disease, are pregnant or planning to be, or have symptoms, adding TPO antibodies and free T4 to a repeat test is more informative than re-running TSH alone.',
    alongside: [
      '**TPO antibodies** — the most useful addition, since they can turn positive long before TSH does',
      '**Free T4** to confirm output is normal',
      '**A comparison against any older TSH results** you can dig up',
    ],
    urgency:
      'Not urgent. This is a note-it-and-compare-later result, with pregnancy the one exception where upper-range values are managed more actively.',
    links: [L_HUB, L_TPO, L_TIRED],
    refs: [REF_NIDDK, REF_JCEM],
  },
  {
    id: 'high-normal',
    min: 2.6,
    max: 3.6,
    label: 'High-normal',
    verdict: 'in the upper part of the normal range',
    meaning: [
      'Your report will say normal, and by the standard reference range it is. But this sits in the most-debated stretch of the entire thyroid panel — high enough that some clinicians would want a repeat and antibodies, low enough that many would not comment at all.',
      'The reason the disagreement exists is that reference intervals describe whoever was sampled, and those samples contained people with early undiagnosed thyroid disease. Narrower ranges have been proposed on exactly that basis without becoming consensus.',
      'What makes a value here meaningful is direction rather than magnitude. A 3.2 that was 1.3 two years ago tells a story; a 3.2 that has been flat for a decade tells you this is just your number.',
    ],
    causesHeading: 'What can put TSH in the high-normal band',
    causes: [
      '**Early autoimmune thyroiditis**, drifting upward over years before crossing the line',
      '**Individual set point** — plenty of healthy people simply run here',
      '**Diurnal variation** — TSH peaks overnight and early morning',
      '**Iodine or selenium status**, occasionally relevant at the margins',
      '**Ageing**, which shifts TSH gently upward',
    ],
    treatment:
      'Treatment is not standard inside the reference range. The informative move is a repeat with free T4 and TPO antibodies, weighted by symptoms, family history and whether pregnancy is on the horizon.',
    alongside: [
      '**TPO antibodies** — the single most useful test here',
      '**Free T4** to confirm hormone output is holding',
      '**A repeat TSH in three to six months**, drawn at a similar time of day',
    ],
    urgency:
      'Not urgent, with the pregnancy exception. Treat it as a baseline to compare against rather than a problem to solve.',
    links: [L_HUB, L_TPO, L_SYMPT],
    refs: [REF_NIDDK, REF_JCEM],
  },
  {
    id: 'top-of-normal',
    min: 3.6,
    max: REF_HIGH,
    label: 'Top of the normal range',
    verdict: 'at the very top of the normal range',
    meaning: [
      'This is inside the range by a margin so thin that a different laboratory, using a slightly different interval, might flag it. Functionally it sits on the boundary.',
      'A result here is the classic "your thyroid is fine, retest in six months" conversation. That is not wrong, but it does discard the most useful information available: whether you arrived at this number from below. Someone whose TSH has climbed 1.8 → 2.9 → 3.8 across three years is on a trajectory, even though every single one of those results was normal.',
    ],
    causesHeading: 'What sits behind a borderline-normal TSH',
    causes: [
      '**Early Hashimoto\'s thyroiditis**, the most common progressive cause',
      '**Laboratory differences** — some report up to 4.5, others stop at 3.5',
      '**Overnight or early-morning sampling**, when TSH peaks',
      '**Subtle under-replacement**, if you already take levothyroxine',
    ],
    treatment:
      'No treatment for a normal value. The genuinely useful action is establishing whether it is moving — which means a repeat with free T4 and TPO antibodies rather than waiting for it to cross a line.',
    alongside: [
      '**TPO antibodies** — positive antibodies here substantially change the outlook',
      '**Free T4** to confirm output',
      '**Any older TSH results**, which turn one value into a trend',
    ],
    urgency:
      'Not urgent. Do raise it promptly if you are pregnant or trying to conceive, where the thresholds used are lower.',
    links: [L_HUB, L_TPO, L_CAUSES],
    refs: [REF_NIDDK, REF_JCEM, REF_SUBCLIN],
  },
  {
    id: 'just-over',
    min: REF_HIGH,
    max: 5.0,
    label: 'Just above the reference range',
    verdict: 'just above the reference range',
    meaning: [
      'This is the mildest abnormal result on the high side. It clears the top of the range but only barely, and it is the single most common abnormal thyroid result there is.',
      'When free T4 is still normal, this is subclinical hypothyroidism at its earliest. A meaningful share of results in this band normalise on their own — which is exactly why guidance leans on repeating the test before doing anything else.',
      'Symptoms at this level are usually absent or mild, and where they exist they overlap heavily with iron deficiency and vitamin D deficiency. That overlap is worth taking seriously before attributing everything to the thyroid.',
    ],
    causesHeading: 'What causes a marginally raised TSH',
    causes: [
      "**Hashimoto's thyroiditis** — the most common cause, confirmed with TPO antibodies",
      '**Transient elevation** after illness, which resolves without treatment',
      '**Recovery from thyroiditis**',
      '**Slight under-replacement**, if you take levothyroxine',
      '**Assay interference or biotin supplements**, an occasional false high',
    ],
    treatment:
      'Repeat the test in six to twelve weeks with free T4 and TPO antibodies before any decision. Treatment at this level is the exception rather than the rule, and it becomes more likely with positive antibodies, clear symptoms, a rising trend, or pregnancy.',
    alongside: [
      '**Free T4** — normal keeps this subclinical rather than overt',
      "**TPO antibodies** — identifies Hashimoto's and predicts whether it will progress",
      '**A repeat TSH after 6-12 weeks**, before concluding anything',
      '**Ferritin and vitamin D**, which often explain the symptoms better than the thyroid does',
    ],
    urgency:
      'Not urgent, but do book the follow-up rather than filing it away. Raise it promptly if you are pregnant or trying to conceive.',
    links: [L_HUB, L_CAUSES, L_TPO, L_FERR],
    refs: [REF_NIDDK, REF_SUBCLIN, REF_JCEM],
  },
  {
    id: 'mild-subclinical',
    min: 5.0,
    max: 7.0,
    label: 'Mild subclinical hypothyroidism',
    verdict: 'clearly above the reference range',
    meaning: [
      'This is unambiguously above the reference range, yet still well short of the level at which treatment is usually automatic. With a normal free T4 it is subclinical hypothyroidism: the pituitary is working noticeably harder to keep output where it belongs.',
      'The condition is common — undiagnosed thyroid dysfunction, mostly this milder form, affects several percent of adults and becomes more frequent with age. Many people here notice little or nothing.',
      'Two things drive the decision more than the number itself: whether antibodies are positive, and which way successive results are heading. A stable 5.8 across three years is watched; a 5.8 that was 3.1 last year is followed much more closely.',
    ],
    causesHeading: 'What causes a TSH in this range',
    causes: [
      "**Hashimoto's thyroiditis** — the dominant cause in iodine-sufficient countries",
      '**Under-replacement with levothyroxine**, including absorption problems',
      '**Medications** such as amiodarone or lithium',
      '**Recovery after thyroid surgery or radioiodine**',
      '**Iodine deficiency or excess**, depending on where you live',
    ],
    treatment:
      'A trial of levothyroxine is a genuine option here rather than a default. The case strengthens with positive TPO antibodies, a goitre, symptoms that fit, high cardiovascular risk, or plans for pregnancy — and weakens in older adults, where mildly raised TSH may be benign.',
    alongside: [
      '**Free T4** — normal means subclinical, low means overt hypothyroidism',
      "**TPO antibodies** — the strongest predictor of progression",
      '**A repeat TSH after 6-12 weeks** to establish the trend',
      '**Lipids**, since an underactive thyroid nudges cholesterol upward',
    ],
    urgency:
      'Book a follow-up rather than waiting for a routine review, and flag it promptly in pregnancy.',
    links: [L_HUB, L_SYMPT, L_TPO, L_CAUSES],
    refs: [REF_NIDDK, REF_SUBCLIN, REF_JCEM],
  },
  {
    id: 'approaching-threshold',
    min: 7.0,
    max: TREAT_HIGH,
    label: 'Approaching the treatment threshold',
    verdict: 'well above the reference range',
    meaning: [
      'This is the upper reach of subclinical hypothyroidism — above the range by a clear margin and close to the point where most guidance stops recommending observation and starts recommending treatment.',
      'At this level the odds shift. Antibodies are more often positive, symptoms are more often present, and progression to overt hypothyroidism over the following years is more likely than it is at a marginal result. The pituitary is pushing hard to keep hormone output normal, and that compensation tends not to hold indefinitely.',
      'Free T4 becomes the deciding test. Still normal, and this remains subclinical; already falling, and the picture is overt hypothyroidism regardless of which side of 10 the TSH sits.',
    ],
    causesHeading: 'What causes a TSH at this level',
    causes: [
      "**Hashimoto's thyroiditis**, usually with positive TPO antibodies",
      '**Inadequate levothyroxine dose**, or taking it with food, calcium or iron',
      '**Post-surgical or post-radioiodine hypothyroidism** under-replaced',
      '**Medications** including amiodarone, lithium and some immunotherapies',
    ],
    treatment:
      'Treatment is commonly started in this band, particularly under 65, with symptoms, with positive antibodies, or with cardiovascular risk. Where it is not started, the follow-up interval is usually short — months, not years — because progression is likely enough to warrant watching closely.',
    alongside: [
      '**Free T4** — the test that separates subclinical from overt',
      "**TPO antibodies** to confirm the cause and gauge progression risk",
      '**Lipid panel**, often raised and often improving with treatment',
      '**Ferritin and B12**, commonly low alongside autoimmune thyroid disease',
    ],
    urgency:
      'Worth an appointment in the near term rather than at your next routine visit — sooner with significant symptoms, pregnancy, or existing heart disease.',
    links: [L_HUB, L_SYMPT, L_TPO, L_CHOL],
    refs: [REF_NIDDK, REF_SUBCLIN, REF_ATA_HYPO],
  },
  {
    id: 'overt',
    min: TREAT_HIGH,
    max: 20,
    label: 'Overt hypothyroidism range',
    verdict: 'past the usual treatment threshold',
    meaning: [
      'Crossing 10 is where most guidance switches from watch-and-repeat to treat, regardless of how you feel. The pituitary is pushing hard, and by this point thyroid hormone output has usually begun to fall behind — which is what distinguishes overt hypothyroidism from the subclinical form.',
      'Symptoms are more likely here, though still famously non-specific: fatigue that sleep does not fix, cold intolerance, weight gain, dry skin, constipation, low mood, brain fog. A lot of people reach a result like this having attributed all of it to stress, age or a busy year.',
      'The value also carries information about time. TSH does not climb this far quickly, so a result here generally reflects a process that has been developing for many months.',
    ],
    causesHeading: 'What causes a TSH above the treatment threshold',
    causes: [
      "**Hashimoto's thyroiditis** — by far the most common cause",
      '**Untreated or inadequately treated hypothyroidism**, including missed doses',
      '**After thyroid surgery or radioiodine treatment**',
      '**Medications** such as amiodarone or lithium',
      '**Severe iodine deficiency**, where geographically relevant',
    ],
    treatment:
      'Levothyroxine is usually recommended at this level, with the starting dose guided by weight, age and cardiac history. Because TSH responds slowly, the dose is normally reassessed after roughly six to eight weeks rather than sooner.',
    alongside: [
      '**Free T4** — confirms whether output has actually dropped',
      '**TPO antibodies** to establish the cause',
      '**Lipid panel** — cholesterol rises with hypothyroidism and often improves with treatment',
      '**Ferritin and B12**, frequently low alongside it',
    ],
    urgency:
      'Arrange a prompt appointment rather than waiting for a routine review, especially with marked symptoms, pregnancy, or known heart disease.',
    links: [L_HUB, L_SYMPT, L_CAUSES, L_CHOL],
    refs: [REF_NIDDK, REF_ATA_HYPO, REF_JCEM],
  },
  {
    id: 'marked',
    min: 20,
    max: 45,
    label: 'Marked hypothyroidism',
    verdict: 'many times the upper limit',
    meaning: [
      'A TSH in this range indicates substantial hypothyroidism. Free T4 is usually clearly low by now, and symptoms are typically present and noticeable rather than subtle.',
      'Getting here takes time. The pituitary escalates its signal gradually as thyroid output declines, so a value in this band points to a gland that has been failing for a long stretch — often a year or more of slowly worsening fatigue, cold intolerance and weight change that got explained away.',
      'The good news attached to a number like this is that it responds well to treatment, and most of the symptoms are reversible once replacement is established.',
    ],
    causesHeading: 'What causes hypothyroidism this marked',
    causes: [
      "**Long-standing Hashimoto's thyroiditis**, often undiagnosed for years",
      '**Stopped thyroid medication**, or replacement never started after a diagnosis',
      '**Malabsorption** of levothyroxine — coeliac disease, gastric surgery, or dosing with food',
      '**After thyroidectomy or radioiodine** without adequate replacement',
    ],
    treatment:
      'Thyroid hormone replacement is clearly indicated and started under clinical supervision. Dosing is approached more cautiously in older adults and anyone with heart disease, because correcting a long-standing deficit too fast can strain the heart.',
    alongside: [
      '**Free T4** — expected to be low at this level',
      '**TPO antibodies** to confirm the autoimmune cause',
      '**Lipids, sodium and a full blood count**, all commonly disturbed here',
      '**Coeliac screening** if absorption is in question',
    ],
    urgency:
      'This warrants prompt medical attention rather than a scheduled recheck. It is not usually an emergency, but it should not wait weeks.',
    links: [L_HUB, L_SYMPT, L_100, L_CHOL],
    refs: [REF_NIDDK, REF_ATA_HYPO],
  },
  {
    id: 'severe',
    min: 45,
    max: Infinity,
    label: 'Severe hypothyroidism',
    verdict: 'extremely high',
    meaning: [
      'A TSH this high is not a borderline finding. It indicates severe hypothyroidism, and because the number climbs gradually, a value here points to a thyroid that has been substantially underactive for a long time — frequently many months to years.',
      'Free T4 is usually clearly low and symptoms are typically marked: profound fatigue, cold intolerance, a slowed heart rate, dry skin, hoarseness, constipation, low mood, sometimes puffiness around the face and hands.',
      'Occasionally an extreme value reflects something other than the gland itself — assay interference, or rarely a pituitary problem driving inappropriate TSH production. Those are uncommon, and the practical response is identical: get it assessed quickly rather than repeated in six months.',
    ],
    causesHeading: 'What causes a TSH this high',
    causes: [
      "**Long-standing untreated Hashimoto's thyroiditis**",
      '**Thyroid replacement stopped or never started**, including absorption failure',
      '**After thyroidectomy or radioiodine** with no adequate replacement',
      '**Severe iodine deficiency**, in affected regions',
      '**Assay interference or a pituitary cause** — rare, considered when the picture does not fit',
    ],
    treatment:
      'Replacement is indicated and should be started and monitored by a clinician. Cautious dose escalation is the norm in older people and anyone with cardiac disease, since rapid correction of a long-standing deficit can precipitate angina or arrhythmia.',
    alongside: [
      '**Free T4** — expected to be clearly low',
      '**TPO antibodies** to confirm the cause',
      '**Sodium, lipids, creatine kinase and a full blood count**, commonly abnormal in severe hypothyroidism',
      '**Cortisol**, if a pituitary cause is suspected',
    ],
    urgency:
      'Seek medical attention promptly. Severe untreated hypothyroidism has real complications, and it treats well once identified.',
    links: [L_100, L_SYMPT, L_HUB],
    refs: [REF_NIDDK, REF_ATA_HYPO, REF_STAT_TSH],
  },
];

/**
 * EXACTLY ONE VALUE PER SEGMENT — 15 pages, no two sharing a narrative.
 *
 * A second pass had 2 values per segment (23 pages) and measured 0.98-1.00 vocabulary
 * overlap for same-segment pairs, because the medical meaning of TSH 5 and TSH 6 is
 * genuinely identical. No amount of rewording fixes that; the fix is one page per
 * distinct clinical meaning. Scale by adding SEGMENTS or MARKERS, never by adding more
 * numbers inside one band.
 *
 * (demand) = already shows impressions in Search Console with no dedicated page.
 */
export const VALUES = [
  0.01,  // undetectable
  0.05,  // deeply suppressed
  0.1,   // clearly low
  0.3,   // borderline low
  0.5,   // low normal
  1.5,   // mid normal
  2.5,   // upper-mid normal
  3.5,   // high normal
  3.9,   // top of normal
  4.8,   // just over the line        (demand)
  5.5,   // mild subclinical
  8.8,   // approaching threshold     (demand)
  11,    // overt                     (demand)
  30,    // marked
  100,   // severe                    (demand)
];

export const slugFor = (v: number) => String(v).replace('.', '-');
export const bandFor = (v: number) => BANDS.find((b) => v >= b.min && v < b.max)!;

/** Facts derived from the specific value — genuinely per-page rather than per-segment. */
export function factsFor(v: number) {
  const band = bandFor(v);
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    band,
    inRange: v >= REF_LOW && v <= REF_HIGH,
    aboveHigh: v > REF_HIGH ? round(v - REF_HIGH) : null,
    belowLow: v < REF_LOW ? round(REF_LOW - v) : null,
    belowTreat: v > REF_HIGH && v < TREAT_HIGH ? round(TREAT_HIGH - v) : null,
    timesHigh: v > REF_HIGH ? round(v / REF_HIGH) : null,
    timesLow: v < REF_LOW && v > 0 ? round(REF_LOW / v) : null,
  };
}
