import { Container } from "@/di/container";
import Play from "@/components/Play";

const getWordData = async () => {
  const dataLoader = Container.getInstance().getDataLoader();
  const wordData = await dataLoader.load();
  return wordData;
};

const PlayPage = async () => {
  const wordData = await getWordData();
  return <Play data={wordData} />;
};

export default PlayPage;
