import express, { type Request, type Response } from 'express';
import { logger } from '@/logger/index.ts';
import { handleError } from '@/utils/index.ts';
import OpenAI from 'openai';
import { memberAuthMiddleware } from '@/middleware/partner-auth.ts';
import { Member } from '@/db/models/member.ts';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const sponsoredBrands = [
  "Great Value",
  "Lay's"
]

const router = express.Router();

router.use('/img', express.raw({ type: 'application/octet-stream', limit: '10mb' }));

router.post('/img', memberAuthMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.body) { // text url
      logger.error('[/img]: No image provided');
      return res.status(400).json({ error: 'No image provided' });
    }

    const image = Buffer.from(req.body).toString('base64');

    logger.info('[/img]: Image upload succeeded');

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: "system",
          content: `You are a receipt parser. You will be given an image of a receipt and you must parse (1) whether it is a receipt (true/false), and if true, (2) the store name, (3) a list of items purchased along with their prices, (4) the total cost of the purchase, (5) the date of the purchase, (6) the carbon footprint estimate for the purchase in kilograms, (7) whether the purchase was made at a generic store (e.g. Walmart, Target, etc.), and (8) if and only if the purchase was made at a generic store list all products from the following list of sponsored brands: ${sponsoredBrands.join(', ')}, (9) as well as the total cost of the sponsored products only. Your response should be in the following format: {"receipt": true, "storeName": "Walmart", "items": [{"name": "apple", "price": 1.00}, {"name": "banana", "price": 0.50}, {"name": "GV Sliders", "price": 5.00}], "totalCost": 1.50, "date": "2024-09-14", "co2": 6.0, "generic": true, "sponsoredProducts": [{"name": "GV Sliders", "price": 5.00}], "sponsoredCost": 5.00}. Expand all abbreviations in product names (e.g. GV -> Great Value, HNY -> Honey) and assume all spelling on the receipt is correct, so there should be no spelling errors in the output. Ensure that the response is strictly in this JSON format with no additional information. Ensure that the total sum of all items agrees with the total cost listed on the receipt. Ensure all Return in full raw JSON response without any formatting such as \`\`\`json\`\`\`.`
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${image}`
              }
            }
        ]
        }
      ],
      max_tokens: 1024,
      temperature: 0.2,
    })

    logger.info('[/img]: GPT response received');


    const jsonResponse = JSON.parse(response.choices[0].message.content ?? '{"receipt": false}');
    // points = 10% of the sponsored cost where 100 points = $1
    jsonResponse.points = Math.round(jsonResponse.sponsoredCost * 100 * 0.10);

    if (jsonResponse.points && jsonResponse.points > 0) {
      // update user points by adding the points
      const member = await Member.increment('balance', { by: jsonResponse.points, where: { id: req.memberId } });
    }

    // logger.info('[/img]: GPT parsing succeeded');

    console.log(jsonResponse);
    res.status(200).json(jsonResponse);

  } catch (error) {
    logger.error('[/img]: Image upload or GPT parsing failed');
    handleError(error as Error, res);
  }
});

export { router as imgRouter };
