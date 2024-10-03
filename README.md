# NeuroCheck

Our solution integrates **Generative AI** with **smart contracts** to revolutionize the e-commerce return process. The system leverages advanced machine learning algorithms to analyze extensive customer data, including purchase history, return behavior, and product reviews. The AI calculates a **customer score** based on this data, which is then used to dynamically segment customers and generate personalized return policies.

### Key Features

- **Personalized Return Policies**: Loyal customers with high scores (e.g., low return rates, positive behavior) benefit from lenient policies, such as extended return windows and free shipping. Customers with lower scores (e.g., frequent returns or suspicious activity) face stricter return conditions. This tailored approach enhances customer satisfaction while reducing fraud.

- **Automated Refund Processing**: Smart contracts, built on blockchain technology, automate and secure the refund process. These self-executing contracts verify return conditions and process refunds based on rules set by the AI. When a return meets the AI's criteria (e.g., valid product condition and reason), the smart contract automatically executes the refund.

## Technologies Used

- **Next.js**
- **FastAPI**
- **Langchain**
- **MongoDB**
- **Solidity**
- **Node.js**
- **Express**

## Screenshots

![Design overview for NeuroCheck e-commerce](./src/assets/home_page)

## Project URL

The live site is deployed on Vercel:

- [Live Site URL](https://rakathon-2024.vercel.app/)

## Project Demo

Watch the demo on Loom:

- [Demo Video](https://www.loom.com/share/3f4eb8ec572d4ffdbe76fd5f8fa90c8f?sid=5d3f75a1-4c10-4961-8778-4295d1aa9a03)

## Getting Started

To run the development server:

1. Set up the environment variables:
    ```bash
    SANITY_PROJECTID=v9o19na1 NEXT_PUBLIC_PROJECT_ID=b362c8f59be260a22a9ecd304d11a640
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the application:
    ```bash
    npm run dev
    ```

---
