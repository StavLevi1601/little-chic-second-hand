import backgroundOurStory from '../assets/images/backgrounds/background-our-story.webp';
import { BackgroundAnimation } from '../components/backgrounds/backgrounds.style';

export const OurStory = () => {
  const backgrounds = [`url(${backgroundOurStory})`];

  return (
    <>
      <BackgroundAnimation backgroundImage={backgrounds[0]} />
      <h1>Our Story</h1>
      <p>
        Little Chic is your go-to online marketplace for stylish second-hand children's clothing. We
        started with a simple idea: kids grow fast, but their clothes shouldn't cost a fortune or
        end up in landfills. As a mom, I wanted to dress my daughter in cute, quality outfits
        without breaking the bank. I realized many parents face the same challenge – we want our
        kids to look great, but we're also practical about costs and sustainability. That's where
        Little Chic comes in. We connect parents who want to sell gently-used, fashionable kids'
        clothes with those looking to buy them at a fraction of the original price. It's not just
        about savings; it's about creating a smarter, more sustainable way to keep up with our
        children's ever-changing wardrobe needs. By choosing Little Chic, you're not just shopping –
        you're joining a community of savvy parents who value both style and sensibility. Whether
        you're buying or selling, you're part of a movement that's making kids' fashion more
        accessible and eco-friendly. Little Chic: Where little fashionistas and smart budgeting
        meet!
      </p>
    </>
  );
};
