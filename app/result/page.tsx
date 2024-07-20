import { Result } from "@/components/Result";
import { Container } from "@/di/container";

const getRankingData = async () => {
  const dataLoader = Container.getInstance().getRankingLoader();
  const rankingData = await dataLoader.load();
  return rankingData;
};

export const ResultPage = async () => {
  const rankingData = await getRankingData();

  return <Result response={rankingData} />;
};

export default ResultPage;
