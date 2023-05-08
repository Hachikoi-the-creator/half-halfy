import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const server = Fastify();

// Route to check if the server is running
server.get("/ping", async (request, reply) => {
  reply.send("Server is running");
});

// Route to them all
server.get("/", async (request, reply) => {
  try {
    const users = await prisma.csv.findMany();
    reply.send(users);
  } catch (error) {
    reply.status(500).send({ error: "Error fetching users" });
  }
});

type IdParam = FastifyRequest<{ Params: { id: string } }>;

// Route to fetch a user by ID
server.get("/:id", async (request: IdParam, reply) => {
  const { id } = request.params as { id: string };

  try {
    const user = await prisma.csv.findUnique({
      where: { id: parseInt(id) },
    });
    if (user) {
      reply.send(user);
    } else {
      reply.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    reply.status(500).send({ error: "Error fetching user" });
  }
});

// get the csv in a massive string
// JSON.parse it
// loop trough all the items & store a copy in a set for every field, name, phone, email
// keep track of the values that had at least one duplicated but not all values and send it as {dupsAmount: N}
// - if .size doesn't increase then it's a repeated item,
// - if all the values are duplicated then dont store it in a new array
// - esle store it in another array in the form of {unique:false, val:name|phone|email}
// - if else not repeated in any field store it like {uniqe:true, val:name|phone|email}
server.post("/csv", async (req, res) => {
  res.status(200).send("owo");
});

// Start the server w IIFC/E (Immediately Invoked Function Call/Expression)
(async () => {
  try {
    await prisma.$connect();
    await server.listen({ port: 3000 });
    console.log("Server listening on port 3000");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
})();
