// Original practice questions. correctAnswer is a zero-based choice index; never renumber existing IDs.
// Every numeric key was computed in code before this file was written.

export const bank = {
  questions: [
    {
      id: "precalculus-2-5-q01",
      topicId: "precalculus-2-5",
      concept: "using-models",
      difficulty: "Quick check",
      skill: "describe",
      prompt:
        "The value of a car, in dollars, t years after it is purchased is modeled by V(t) = 24000(0.88)ᵗ. Which of the following is the best interpretation of 0.88?",
      choices: [
        "The car loses $0.88 of value each year.",
        "The car's value decreases by 88% each year.",
        "The car's value decreases by 12% each year.",
        "The car's value is 88% of its purchase price after t years.",
      ],
      correctAnswer: 2,
      explanation:
        "The base 0.88 is the growth factor per year. Each year the value is 88% of the previous year's value, a 12% decrease.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "The base is a factor that multiplies the value, not an amount subtracted.",
        "Keeping 88% of the value is a 12% decrease, not an 88% decrease.",
        "1 − 0.88 = 0.12, a 12% decrease per year.",
        "The value is 88% of the purchase price only after 1 year.",
      ],
      nearMissIndex: 1,
      distinguisher:
        "The growth factor is the fraction kept; the percent change is 1 − b.",
    },
    {
      id: "precalculus-2-5-q02",
      topicId: "precalculus-2-5",
      concept: "building-models",
      difficulty: "Quick check",
      skill: "construct-functions",
      prompt:
        "An exponential model f(x) = abˣ satisfies f(1) = 6 and f(3) = 54, with b > 0. What are the values of a and b?",
      choices: [
        "a = 2 and b = 3",
        "a = 6 and b = 3",
        "a = 2 and b = 9",
        "a = −6 and b = 24",
      ],
      correctAnswer: 0,
      explanation: "ab³/(ab) = b² = 54/6 = 9, so b = 3. Then a = 6/3 = 2.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "b² = 9 gives b = 3, and ab = 6 gives a = 2.",
        "a is f(0), not f(1). With a = 6, f(1) = 18.",
        "9 is b², the factor over two units.",
        "These values fit a line through the two points, not an exponential function.",
      ],
      nearMissIndex: 1,
      distinguisher: "Divide the equations to find b, then substitute to find a.",
    },
    {
      id: "precalculus-2-5-q03",
      topicId: "precalculus-2-5",
      concept: "proportional-growth",
      difficulty: "Quick check",
      skill: "identify-information",
      prompt:
        "A data set has outputs 5, 8, 14, 26, 50 at the inputs 0, 1, 2, 3, 4. What constant can be subtracted from each output to reveal a proportional pattern?",
      choices: ["3", "4", "1", "2"],
      correctAnswer: 3,
      explanation:
        "Subtracting 2 gives 3, 6, 12, 24, 48, which have a constant ratio of 2.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "Subtracting 3 gives 2, 5, 11, 23, 47, whose ratios are not constant.",
        "Subtracting 4 gives 1, 4, 10, 22, 46, whose ratios are not constant.",
        "Subtracting 1 gives 4, 7, 13, 25, 49, whose ratios are not constant.",
        "5 − 2 = 3, 8 − 2 = 6, 14 − 2 = 12, 26 − 2 = 24, 50 − 2 = 48: ratio 2.",
      ],
      nearMissIndex: 0,
      distinguisher: "Check that every ratio is the same after subtracting.",
    },
    {
      id: "precalculus-2-5-q04",
      topicId: "precalculus-2-5",
      concept: "using-models",
      difficulty: "Quick check",
      skill: "equivalent-forms",
      prompt:
        "The number of bacteria in a culture is modeled by N(h) = 400(3)ʰ, where h is in hours. Which equivalent form shows the growth factor per half hour?",
      choices: [
        "N(h) = 400(9)^(h/2)",
        "N(h) = 400(√3)^(2h)",
        "N(h) = 400(1.5)^(2h)",
        "N(h) = 200(3)^(2h)",
      ],
      correctAnswer: 1,
      explanation:
        "In half-hour units the exponent is 2h. Since 3ʰ = (3^(1/2))^(2h) = (√3)^(2h), the growth factor per half hour is √3 ≈ 1.732.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "(9)^(h/2) = 3ʰ is equivalent, but it shows the factor per 2 hours, not per half hour.",
        "(√3)^(2h) = 3ʰ, and 2h counts half hours.",
        "1.5 = 3/2 is not the square root of 3, so this form is not equivalent.",
        "Halving the initial value and doubling the exponent changes the function.",
      ],
      nearMissIndex: 2,
      distinguisher: "Per half hour means the exponent counts half hours: 2h.",
    },
    {
      id: "precalculus-2-5-q05",
      topicId: "precalculus-2-5",
      concept: "building-models",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "A town's population was 18,000 in 2015 and 22,000 in 2020. Assuming the population grows exponentially, which equation models the population P, where t is the number of years since 2015?",
      choices: [
        "P(t) = 18000 + 800t",
        "P(t) = 18000(22000/18000)ᵗ",
        "P(t) = 18000(22000/18000)^(t/5)",
        "P(t) = 22000(18000/22000)^(t/5)",
      ],
      correctAnswer: 2,
      explanation:
        "Over 5 years the population is multiplied by 22000/18000. So the growth factor per 5 years is 22000/18000, and P(t) = 18000(22000/18000)^(t/5). Check: P(5) = 22000.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "Adding 800 per year is a linear model.",
        "This multiplies by 22000/18000 every year, so P(5) would be far above 22000.",
        "P(0) = 18000 and P(5) = 18000(22000/18000) = 22000.",
        "This starts at 22000 and decreases, which fits neither data point at t = 0.",
      ],
      nearMissIndex: 1,
      distinguisher: "The ratio of the data values is the factor over the 5-year gap.",
    },
    {
      id: "precalculus-2-5-q06",
      topicId: "precalculus-2-5",
      concept: "using-models",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A balance is modeled by B(t) = 1200(1.03)ᵗ, where t is in years. According to the model, which is closest to the number of years it takes the balance to reach $2400?",
      choices: ["23.450 years", "33.333 years", "2 years", "20.731 years"],
      correctAnswer: 0,
      explanation:
        "Solve 1200(1.03)ᵗ = 2400, so 1.03ᵗ = 2. With a graphing calculator, t ≈ 23.450 years.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "1.03ᵗ = 2 gives t ≈ 23.450.",
        "33.333 = 100/3 treats 3% as simple growth of $36 per year.",
        "2 is the factor by which the balance must grow, not the time.",
        "20.731 uses a growth factor of 1.034 instead of 1.03.",
      ],
      nearMissIndex: 3,
      distinguisher: "Solve for the input after dividing out the initial value.",
    },
    {
      id: "precalculus-2-5-q07",
      topicId: "precalculus-2-5",
      concept: "proportional-growth",
      difficulty: "Core",
      skill: "construct-functions",
      prompt:
        "A cup of tea at 200°F is placed in a room at 68°F. The difference between the tea's temperature and the room temperature is halved every 8 minutes. Which function models the tea's temperature T, in °F, t minutes after it is placed in the room?",
      choices: [
        "T(t) = 200(1/2)^(t/8)",
        "T(t) = 132(1/2)^(8t) + 68",
        "T(t) = 200(1/2)^(t/8) + 68",
        "T(t) = 132(1/2)^(t/8) + 68",
      ],
      correctAnswer: 3,
      explanation:
        "The difference starts at 200 − 68 = 132 and is multiplied by 1/2 every 8 minutes: 132(1/2)^(t/8). Adding 68 gives the temperature. Check: T(0) = 200.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "This approaches 0°F, not the room temperature of 68°F.",
        "(1/2)^(8t) halves every 1/8 minute, not every 8 minutes.",
        "This gives T(0) = 268°F, not 200°F.",
        "The proportional part is the 132-degree difference, plus the constant 68.",
      ],
      nearMissIndex: 2,
      distinguisher:
        "The exponential part models the difference from 68, not the temperature itself.",
    },
    {
      id: "precalculus-2-5-q08",
      topicId: "precalculus-2-5",
      concept: "building-models",
      difficulty: "Core",
      skill: "describe",
      prompt: "Which of the following statements about the natural base e is true?",
      choices: [
        "e is exactly 2.718, so every model with base e is rounded.",
        "e ≈ 2.718, and it is often the base of exponential models in context.",
        "e can be used only as the base of exponential decay models.",
        "e is the initial value of every exponential model in context.",
      ],
      correctAnswer: 1,
      explanation:
        "The natural base e, which is approximately 2.718, is often used as the base in exponential functions that model contextual scenarios.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "2.718 is an approximation; e is not exactly 2.718.",
        "This is how the CED describes e.",
        "Since e > 1, a model aeᵏˣ with k > 0 demonstrates growth.",
        "e is a base, not an initial value.",
      ],
      nearMissIndex: 0,
      distinguisher: "e is a base, approximately 2.718.",
    },
    {
      id: "precalculus-2-5-q09",
      topicId: "precalculus-2-5",
      concept: "using-models",
      difficulty: "Core",
      skill: "apply-results",
      prompt:
        "A quantity is modeled by Q(d) = 50(2)ᵈ, where d is the number of days. By what factor does the quantity increase every week?",
      choices: ["14", "49", "128", "256"],
      correctAnswer: 2,
      explanation:
        "Q(d) = 50(2⁷)^(d/7), so the quantity increases by a factor of 2⁷ = 128 every week.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "14 = 2·7 multiplies the daily factor by 7 instead of raising it to the 7th power.",
        "49 = 7² switches the base and the exponent.",
        "Seven factors of 2: 2⁷ = 128.",
        "256 = 2⁸ uses eight factors of 2 instead of seven.",
      ],
      nearMissIndex: 0,
      distinguisher: "Seven days means seven factors of the daily growth factor.",
    },
    {
      id: "precalculus-2-5-q10",
      topicId: "precalculus-2-5",
      concept: "using-models",
      difficulty: "Core",
      skill: "support-conclusions",
      prompt:
        "The number of visitors to a website t months after launch is modeled by V(t) = 900(1.15)ᵗ for 0 ≤ t ≤ 12. Which statement about using the model to predict V(60) is most appropriate?",
      choices: [
        "V(60) is a reliable prediction, because exponential models are valid for all real inputs.",
        "V(60) cannot be computed, because 60 is not a whole number of years.",
        "V(60) is a reliable prediction, because the model was built from data.",
        "V(60) may not be reliable, because t = 60 is far outside the domain 0 ≤ t ≤ 12.",
      ],
      correctAnswer: 3,
      explanation:
        "Exponential models can be used to predict values depending on the contextual constraints on the domain. Predicting at t = 60 extrapolates far beyond 0 ≤ t ≤ 12, where growth by 15% per month is unlikely to continue.",
      sourceIds: ["ced", "ced-topic-2-5"],
      choiceExplanations: [
        "The function is defined for all real inputs, but the model applies only on its contextual domain.",
        "t is measured in months, and V(60) can be computed; the issue is reliability.",
        "Being built from data does not make predictions reliable outside the data's domain.",
        "Predictions depend on the contextual constraints on the domain.",
      ],
      nearMissIndex: 0,
      distinguisher:
        "A function's domain is not the same as a model's contextual domain.",
    },
  ],
  quizzes: [
    {
      id: "precalculus-2-5-mcq",
      courseId: "precalculus",
      unitId: "precalculus-2",
      topicId: "precalculus-2-5",
      title: "Exponential Function Context and Data Modeling multiple choice",
      quizType: "mcq",
      questionIds: [
        "precalculus-2-5-q01",
        "precalculus-2-5-q02",
        "precalculus-2-5-q03",
        "precalculus-2-5-q04",
        "precalculus-2-5-q05",
        "precalculus-2-5-q06",
        "precalculus-2-5-q07",
        "precalculus-2-5-q08",
        "precalculus-2-5-q09",
        "precalculus-2-5-q10",
      ],
    },
  ],
};
