// Original practice questions for Topic 3.6. q-numbered items are topic practice;
// t-numbered items belong to the Unit 3 Practice Test.
import { excerpts } from "../../../excerpts.js";
import { topicBank } from "../../../kit.js";

export const bank = topicBank("3.6", [
  {
    id: "q01",
    s: "equality-and-slavery",
    sub: "1.B",
    kc: ["KC-3.2.I.C"],
    q: "Which of the following shows how Revolutionary ideals affected slavery in the northern states?",
    right:
      "Vermont banned slavery in its 1777 constitution, and Pennsylvania began gradual emancipation in 1780",
    at: 1,
    wrong: [
      [
        "Congress ended slavery in every state in 1776, and the northern states enforced the law first",
        "Congress did not end slavery in 1776, and slavery continued in many states.",
      ],
      [
        "The northern states passed laws requiring every free Black resident to return to Africa after the war",
        "Northern states did not require such removals during the Revolution.",
      ],
      [
        "The northern states increased the number of enslaved workers to supply the army with food and clothing",
        "Northern states took steps to limit slavery.",
      ],
    ],
    why: "Some northern states ended or began to end slavery, which showed that the Revolution's ideals of liberty reached some Americans.",
    d: "The Congress choice is close because the Declaration spoke of equality, but Congress did not end slavery in 1776.",
  },
  {
    id: "q02",
    s: "equality-and-slavery",
    sub: "1.A",
    kc: ["KC-3.2.I.C"],
    q: "In 1775, Lord Dunmore, the royal governor of Virginia, issued a proclamation that",
    right:
      "offered freedom to enslaved people who left rebel owners and joined the British, and thousands fled to British lines",
    at: 2,
    wrong: [
      [
        "freed all enslaved people in Virginia and ordered the colony's assembly to abolish slavery",
        "The offer applied to those who left rebel owners and joined the British.",
      ],
      [
        "promised land in the Ohio Valley to colonists who left the rebel cause and moved west",
        "The proclamation concerned enslaved people who joined the British.",
      ],
      [
        "ordered all enslaved people to join the Continental Army under Washington's command in return for freedom",
        "Dunmore's offer was made on the British side.",
      ],
    ],
    why: "The offer was a military measure, but it showed how the war created opportunities for enslaved people to seek freedom.",
    d: "The abolition choice is close because the offer promised freedom, but it was limited to those who left rebel owners and joined the British.",
  },
  {
    id: "q03",
    s: "equality-and-slavery",
    sub: "5.A",
    r: "comparison",
    kc: ["KC-3.2.I.C"],
    q: "Which of the following was a difference between the northern and southern states in the response to Revolutionary ideals about slavery?",
    right:
      "Many northern states ended or began to end slavery, while slavery remained central to the economy of the South",
    at: 0,
    wrong: [
      [
        "Southern states ended slavery sooner than northern states because they had more enslaved workers",
        "Northern states took the first steps to end slavery.",
      ],
      [
        "Northern states expanded slavery after the war, while southern states passed laws that gradually ended it",
        "This reverses the two regional patterns.",
      ],
      [
        "Both regions kept slavery unchanged until the Constitution required every state to end it in 1808",
        "The Constitution did not require the states to end slavery in 1808.",
      ],
    ],
    why: "Slavery was less central to the economy of the North, and several northern states acted on antislavery ideals, while Southern slaveholders defended the institution.",
    d: "The reversed-pattern choice is close because both regions debated slavery, but it swaps the actions of the two regions.",
  },
  {
    id: "q04",
    s: "republican-motherhood",
    sub: "1.A",
    kc: ["KC-3.2.I.D"],
    q: "The ideal of “republican motherhood” called on women to",
    right:
      "teach republican values within the family, which gave them a new importance in political culture",
    at: 3,
    wrong: [
      [
        "vote in state elections and serve as legislators in order to protect republican government",
        "Women could not generally vote or hold office.",
      ],
      [
        "leave their homes and take over the management of the businesses and farms that men had left",
        "Republican motherhood concerned women's role in teaching citizenship within the family.",
      ],
      [
        "serve as soldiers in the state militias and in the Continental Army during the war for independence",
        "The ideal concerned education within the family.",
      ],
    ],
    why: "Republican motherhood connected women's work in the home to the survival of the republic, because mothers would raise citizens with civic virtue.",
    d: "The voting choice is close because the ideal raised women's civic importance, but it did not give them political rights.",
  },
  {
    id: "q05",
    s: "republican-motherhood",
    sub: "5.B",
    r: "causation",
    kc: ["KC-3.2.I.D"],
    q: "Which of the following best explains why the ideal of republican motherhood gained popularity?",
    right:
      "Women's participation in the Revolution, Enlightenment ideas, and women's appeals for expanded roles",
    at: 1,
    wrong: [
      [
        "Parliament passed a law requiring that women be educated in order to serve in colonial assemblies",
        "Parliament did not pass such a law.",
      ],
      [
        "The Constitution gave women the right to vote, which created a need to educate them in civic duties",
        "The Constitution did not give women the right to vote.",
      ],
      [
        "Women left the colonies during the war, and the new states wanted to bring them back to raise families",
        "Women took part in the Revolution inside the colonies.",
      ],
    ],
    why: "Women had contributed to the Revolutionary cause, Enlightenment writers stressed education, and women argued for a greater role.",
    d: "The Constitution choice is close because it relates to citizenship, but the Constitution did not enfranchise women.",
  },
  {
    id: "q06",
    s: "republican-motherhood",
    sub: "5.A",
    r: "continuity",
    kc: ["KC-3.2.I.D"],
    q: "Which of the following was a continuity in the status of women during and after the Revolution?",
    right:
      "Women still could not vote or hold office in most states, even as their civic role was recognized",
    at: 2,
    wrong: [
      [
        "Women gained equal legal rights with men in every state by the end of the Revolution",
        "Women did not gain equal legal rights.",
      ],
      [
        "Women's roles were limited to the household, and no one argued for expanded education for girls in the new republic",
        "Republican motherhood encouraged the education of girls.",
      ],
      [
        "Women held seats in the first Congress after the ratification of the Constitution of 1787",
        "Women did not hold seats in Congress.",
      ],
    ],
    why: "Republican motherhood gave women a recognized civic role but did not change their lack of political rights.",
    d: "The household choice is close because women's roles were tied to the family, but the ideal supported girls' education.",
  },
  {
    id: "q07",
    s: "global-impact",
    sub: "1.A",
    lo: "G",
    kc: ["KC-3.2.I.E"],
    q: "Which of the following was an example of the global influence of the American Revolution and its ideals?",
    right:
      "The French Revolution of 1789, whose leaders drew on ideas of natural rights and popular government",
    at: 3,
    wrong: [
      [
        "The decision of Canada's colonies to declare independence from Britain in 1776",
        "Canada's colonies did not declare independence in 1776.",
      ],
      [
        "Spain's adoption of the American Constitution as its own framework of government",
        "Spain did not adopt the American Constitution.",
      ],
      [
        "The British government's decision to give up its rule in India after its defeat at Yorktown in 1781",
        "Britain did not leave India after Yorktown.",
      ],
    ],
    why: "The American Revolution and the Declaration of Independence reverberated in France, Haiti, and Latin America, inspiring later independence movements.",
    d: "The Canada choice is close because it is another British colony in North America, but Canada did not declare independence then.",
  },
  {
    id: "q08",
    s: "global-impact",
    sub: "5.B",
    r: "causation",
    lo: "G",
    kc: ["KC-3.2.I.E"],
    q: "Which of the following best explains why historians link the Latin American independence movements of the early 1800s to the American Revolution?",
    right:
      "They were inspired in part by the example of colonies that had won independence from a European empire",
    at: 0,
    wrong: [
      [
        "The United States sent armies to Latin America to fight for independence from Spain and Portugal",
        "The United States did not send armies to fight for Latin American independence at that time.",
      ],
      [
        "American Loyalists who left the United States after 1783 led the independence movements in Latin America",
        "Latin American leaders were mostly local colonists, and Loyalists did not lead these movements.",
      ],
      [
        "Britain required its Latin American colonies to copy the American Constitution when they became independent",
        "Britain did not impose the American Constitution on Latin America.",
      ],
    ],
    why: "The success of American independence and the ideals of the Declaration encouraged colonial peoples elsewhere, even though each movement had its own causes.",
    d: "The armies choice is close because the United States had an interest in the region, but it did not send troops.",
  },
  {
    id: "t01",
    s: "equality-and-slavery",
    sub: "2.A",
    lo: "F",
    kc: ["KC-3.2.I.C"],
    q: "Which of the following best describes the purpose of the excerpt?",
    right:
      "To state the principles that justified the separation of the colonies from Britain",
    at: 1,
    wrong: [
      [
        "To propose a plan of government for the new nation after the end of the war with Britain",
        "The excerpt states principles and does not describe a plan of government.",
      ],
      [
        "To instruct the Continental Army on how to treat Loyalists and prisoners captured in the war",
        "The excerpt is not a military order.",
      ],
      [
        "To request that Parliament remove the king's officials from the colonies and restore colonial assemblies",
        "The excerpt declares principles and is not a request to Parliament.",
      ],
    ],
    why: "The Declaration of Independence opens by stating general principles about equality and rights before listing the colonists' grievances.",
    d: "The plan-of-government choice is close because the Declaration touches on the purpose of government, but the document announces independence.",
    stim: excerpts.declarationEquality,
  },
  {
    id: "t02",
    s: "equality-and-slavery",
    sub: "3.A",
    lo: "F",
    kc: ["KC-3.2.I.C"],
    q: "Which of the following ideas is expressed in the excerpt?",
    right: "All people are equal in their natural rights, which cannot be taken away",
    at: 2,
    wrong: [
      [
        "Rights are granted by the king and can be changed by him whenever the public good requires it",
        "The excerpt says rights come from the Creator and are unalienable.",
      ],
      [
        "Equality means that all people must hold the same amount of property in a republic",
        "The excerpt does not call for equal property.",
      ],
      [
        "Rights belong only to those who own land and can vote in the elections of the colonies",
        "The excerpt states that all men are created equal and does not limit rights to landowners.",
      ],
    ],
    why: "The excerpt states that all men are created equal and have unalienable rights to life, liberty, and the pursuit of happiness.",
    d: "The property choice is close because Revolutionary leaders debated property, but the excerpt speaks of equality in rights.",
    stim: excerpts.declarationEquality,
  },
  {
    id: "t03",
    s: "equality-and-slavery",
    sub: "5.B",
    r: "causation",
    lo: "F",
    kc: ["KC-3.2.I.C"],
    q: "Which of the following developments best shows Americans acting on the ideas in the excerpt?",
    right:
      "Several northern states ended slavery or adopted gradual emancipation laws after 1776",
    at: 0,
    wrong: [
      [
        "Parliament passed the Stamp Act to tax printed materials in the colonies in 1765",
        "The Stamp Act was a British policy that came before the Declaration.",
      ],
      [
        "Congress passed the Alien and Sedition Acts to limit criticism of the government in 1798",
        "These laws limited speech and did not apply the ideas of equality and liberty.",
      ],
      [
        "The Crown issued the Proclamation of 1763 to limit colonial settlement in the West",
        "The Proclamation was a British policy that came before the Declaration.",
      ],
    ],
    why: "Some northern states responded to the language of equality and liberty by ending slavery or adopting plans to end it gradually.",
    d: "The Alien and Sedition Acts choice is close because it concerns rights and liberty, but the laws limited speech and so do not apply the excerpt's ideas.",
    stim: excerpts.declarationEquality,
  },
]);
