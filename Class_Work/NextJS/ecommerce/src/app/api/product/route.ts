import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product";
import { createProductsSchema } from "@/schema/product";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const result = createProductsSchema.safeParse(body);

		if (!result.success) {
			return Response.json(
				{
				
					success: false,
					data: null,
					message: result.error.issues[0].message,
				},
				{ status: 400 },
			);
		}

		const session = await auth();
		if (!session?.user) {
			return Response.json(
				{
					success: false,
					data: null,
					message: "Unauthenticated",
				},
				{ status: 401 },
			);
		}

		await connectToDatabase();

		const newProducts = await Product.insertMany(result.data?.products);

		return Response.json(
			{
				success: true,
				data: newProducts,
				message: `new ${newProducts.length} products created successfully. `,
			},
			{ status: 201 },
		);
	} catch (error) {
		return Response.json(
			{
				succes: false,
				data: null,
				message: `Something went wrong. ${error}`,
			},
			{ status: 200 },
		);
	}
}

export async function GET() {
	try {
		const session = await auth();
		if (!session?.user) {
			return Response.json(
				{
					success: false,
					data: null,
					message: "Unauthenticated",
				},
				{ status: 401 },
			);
		}

		await connectToDatabase();
		const products = await Product.find();

		return Response.json(
			{
				succes: true,
				data: products,
				message: `total ${products.length} Products fetched successfully.`,
			},
			{ status: 200 },
		);
	} catch (error) {
		return Response.json(
			{
				succes: false,
				data: null,
				message: `Something went wrong. ${error}`,
			},
			{ status: 200 },
		);
	}
}