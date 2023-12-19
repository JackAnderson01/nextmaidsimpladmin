import BlackListTokenEntity from "../../../schema/auth/BlackListTokenSchema";

export default async function blackListToken(req, res) {
  try {
    console.log("herer 5");

    const token = req.headers.authorization || req.headers.token;

    console.log("herer 7");

    const existingToken = await BlackListTokenEntity.findOne({ token: token });
    console.log("herer 10");

    if (existingToken != null) {
      return true;
    }
    console.log("herer 15");

    const newBlackList = new BlackListTokenEntity({
      token: token,
    });
    console.log("herer 20");

    const blackListRecord = await newBlackList.save();
    console.log("herer 23");

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
