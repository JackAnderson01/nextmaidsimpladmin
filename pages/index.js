import Head from "next/head";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter()
  setTimeout(() => {
    router.push("/auth/login/")
  }, 3000)
  return (
    <>
      <Head>
        <title>Maid Simpl</title>
        <meta
          name="description"
          content="Nextly is a free landing page template built with next.js & Tailwind CSS"
        />
        <link rel="icon" href="/img/favicon.png" />
      </Head>
      <div>
        <video autoPlay muted>
          <source src="/video/MaidSimpl2.mp4" type="video/mp4" />
          Sorry, your browser doesn't support videos.
        </video>
      </div>
    </>
  );
};

export default Home;