export const sampleConversations = [
  {
    id: 1,
    title: "Conversation about AI ethics",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "What are the ethical concerns with AI development?",
        timestamp: "2025-04-28T10:15:00Z"
      },
      {
        id: 2,
        sender: "bot",
        text: "Ethical concerns in AI development include privacy issues, algorithmic bias, job displacement, autonomous weapons, surveillance applications, and the need for transparency. Addressing these requires diverse teams, thoughtful design, and ongoing monitoring.",
        timestamp: "2025-04-28T10:15:05Z",
        feedback: {
          liked: true,
          rating: null,
          comment: null
        }
      },
      {
        id: 3,
        sender: "user",
        text: "How can we make AI more responsible?",
        timestamp: "2025-04-28T10:16:00Z"
      },
      {
        id: 4,
        sender: "bot",
        text: "Making AI more responsible involves establishing clear ethical guidelines, ensuring diverse development teams, implementing rigorous testing for bias, maintaining human oversight, prioritizing privacy, being transparent about capabilities and limitations, and creating accountability frameworks.",
        timestamp: "2025-04-28T10:16:05Z",
        feedback: {
          liked: true,
          rating: null,
          comment: null
        }
      }
    ],
    feedback: {
      rating: 5,
      comment: "Very informative responses about AI ethics"
    }
  },
  {
    id: 2,
    title: "Learning about machine learning",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "Can you explain machine learning in simple terms?",
        timestamp: "2025-04-29T14:20:00Z"
      },
      {
        id: 2,
        sender: "bot",
        text: "Machine learning is like teaching computers to learn from examples rather than explicit programming. Imagine teaching a child to recognize cats by showing many pictures instead of listing all cat features. The computer finds patterns in data and improves with more examples.",
        timestamp: "2025-04-29T14:20:05Z",
        feedback: {
          liked: true,
          rating: null,
          comment: null
        }
      }
    ],
    feedback: {
      rating: 4,
      comment: "Good explanation but could use more examples"
    }
  },
  {
    id: 3,
    title: "Future technology trends",
    messages: [
      {
        id: 1,
        sender: "user",
        text: "What technology trends will shape the next decade?",
        timestamp: "2025-04-30T09:05:00Z"
      },
      {
        id: 2,
        sender: "bot",
        text: "The next decade will likely be shaped by artificial intelligence advancements, quantum computing becoming more practical, extended reality (AR/VR) integration into daily life, sustainable green tech, biotechnology breakthroughs including personalized medicine, smart cities with IoT infrastructure, and new computing paradigms like neuromorphic computing.",
        timestamp: "2025-04-30T09:05:10Z",
        feedback: {
          liked: false,
          rating: null,
          comment: null
        }
      }
    ],
    feedback: {
      rating: 2,
      comment: "The response was too generic and didn't provide enough specific examples"
    }
  }
];
