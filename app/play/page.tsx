import { Container } from "@/di/container";
import Play from "@/components/Play";

const getWordData = async () => {
  const dataLoader = Container.getInstance().getWordLoader();
  const wordData = await dataLoader.load();
  return wordData;
};

const PlayPage = async () => {
  const wordData = await getWordData();
  return <Play response={wordData} />;
};

export default PlayPage;
