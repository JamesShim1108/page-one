// Original Page One lesson for CED Topic 5.11.
import { section, topicLesson } from "../../../kit.js";

export const lesson = topicLesson("5.11", {
  summary:
    "Why freed people stayed poor under sharecropping, how Redeemers, violence, and the Compromise of 1877 ended Reconstruction, and how courts and Southern laws took away African American rights.",
  minutes: 13,
  goals: [
    "Explain how land ownership and the sharecropping system limited the economic independence of freed people.",
    "Explain how violence, Northern fatigue, and the Compromise of 1877 ended Reconstruction.",
    "Explain how segregation, Supreme Court decisions, and local tactics stripped away African American rights, and how the amendments were used later.",
  ],
  bigIdea:
    "Reconstruction left planters in control of the land and ended with the withdrawal of federal troops, and the nation then allowed Southern states to take away the rights that the amendments had promised.",
  context:
    "The CED asks you to compare the arguments of sources. The documents of this era, such as President Hayes's inaugural address, often described the same events differently from the experience of Black Southerners, so ask whose point of view each source gives.",
  sections: [
    section(
      "land-and-sharecropping",
      "Land and sharecropping",
      ["WXT", "SOC", "GEO"],
      [
        "Southern plantation owners continued to own the majority of the region's land even after Reconstruction. Many formerly enslaved people hoped to own farms of their own. In January 1865 General Sherman had set aside coastal land in Georgia and South Carolina for freed families, but President Johnson ordered most of it returned to its former owners, and Congress did not provide land for the freed people.",
        "Formerly enslaved persons sought land ownership but generally fell short of self-sufficiency, as an exploitative and soil-intensive sharecropping system limited the access of Black and poor white farmers to land in the South. In sharecropping, a landowner let a family farm a plot in return for a share of the crop, and the family bought seed, tools, and food on credit from a local merchant, often at high prices. Debts often exceeded the value of the crop, which bound farmers to the land. Because merchants required cotton, farmers planted it year after year, and the soil wore out.",
      ],
      "Freed people gained freedom but not land, and sharecropping tied many of them to debt and to the planters' fields.",
    ),
    section(
      "redeemers-violence-and-the-end",
      "Redeemers, violence, and the end of Reconstruction",
      ["PCE", "NAT", "GEO"],
      [
        "Southern Democrats who wanted to end Reconstruction called themselves Redeemers. They used violence by the Klan and by groups such as the White League and the Red Shirts, together with economic pressure and fraud, to keep Black voters from the polls. As Republicans lost control of Southern states, Northern support faded. Scandals in the administration of President Ulysses S. Grant and the depression that followed the Panic of 1873 drew attention away from the South. By 1876 Republicans held only South Carolina, Louisiana, and Florida.",
        "The presidential election of 1876 was disputed. Samuel Tilden, the Democrat, won the popular vote, but the electoral votes of those three states were contested. A commission gave all of them to the Republican, Rutherford B. Hayes. In what is often called the Compromise of 1877, Southern Democrats accepted Hayes's election, and Hayes soon withdrew the last federal troops from the South. In his Inaugural Address Hayes called for “wise, honest, and peaceful local self-government” and promised to protect the rights of all, but the withdrawal of troops left Black Southerners without federal protection.",
      ],
      "Violence, Northern fatigue, and the disputed election of 1876 ended federal enforcement of Reconstruction.",
    ),
    section(
      "retreat-from-equal-rights",
      "The retreat from equal rights",
      ["SOC", "PCE", "NAT"],
      [
        "Segregation, violence, Supreme Court decisions, and local political tactics progressively stripped away African American rights. The Supreme Court narrowed the Fourteenth Amendment in the Slaughter-House Cases (1873) and limited federal power to prosecute attacks on Black citizens in United States v. Cruikshank (1876). In the Civil Rights Cases (1883) it held that the Amendment did not forbid private discrimination, and in Plessy v. Ferguson (1896) it upheld “separate but equal” public facilities. Southern states used poll taxes, literacy tests, and violence to keep Black men from voting, and they passed Jim Crow laws that required segregation.",
        "The 14th and 15th amendments eventually became the basis for court decisions upholding civil rights in the 20th century. In Brown v. Board of Education (1954) the Court relied on the Fourteenth Amendment's guarantee of equal protection to rule that segregated public schools were unconstitutional, and the Voting Rights Act of 1965 enforced the Fifteenth Amendment.",
        [
          "Common trap",
          "Reconstruction did not simply disappear in 1877. The amendments stayed in the Constitution, which is why the nation could return to them in the 20th century.",
        ],
      ],
      "Courts, laws, and violence took away rights in the South, but the amendments remained as the basis for later change.",
    ),
  ],
  connections: [
    {
      id: "c1",
      type: "Bridge to Topic 5.12",
      title: "Weighing the results of the war",
      body: "Topic 5.12 asks you to compare the effects of the Civil War and Reconstruction on American values.",
      transferQuestion:
        "Which was the greater change in American life, the end of slavery or the failure of Reconstruction to secure equal rights, and why?",
      feedback:
        "A strong answer takes a position, uses evidence such as the Thirteenth Amendment, sharecropping, or the Slaughter-House Cases, and explains why one effect was more significant while recognizing that the two are connected.",
      links: [
        {
          topicId: "apush-5-10",
          sectionId: "reconstruction-in-the-south",
          label: "Review Reconstruction in the South",
        },
      ],
    },
  ],
  sourceIds: ["hayes-1877"],
});
