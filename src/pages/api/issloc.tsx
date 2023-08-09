import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("http://api.open-notify.org/iss-now.json");
    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching astronauts data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
}
