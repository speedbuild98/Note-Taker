import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

/*Aquí hay una explicación del código
1. Se importa el createTRPCRouter de trpc y se crea el router con el nombre de topicRouter
2. Se crea el endpoint getAll y se le aplica el decorador protectedProcedure.query que protege el endpoint para que solo sea accesible para usuarios logueados.
3. En el endpoint getAll se usa el context para acceder al prisma y retornar todos los topics que pertenezcan al usuario logueado */

export const topicRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      where:{
        userId: ctx.session.user.id,
      }
    });
  }),

  create: protectedProcedure.input(z.object({ title: z.string() }))
  .mutation(({ input, ctx }) => {
    return ctx.prisma.topic.create({
      data: {
        title: input.title,
        userId: ctx.session.user.id,
      },
    });
  }),
});

/*Aquí hay una explicación del código
1. Se crea un nuevo objeto de tipo zod.schema, el cual se encarga de validar los datos de entrada
2. La función mutation, recibe como primer parámetro el objeto de validación de datos de entrada
3. La función mutation, recibe como segundo parámetro una función lambda que recibe como parámetro un objeto con 2 propiedades:
  3.1 input: Los datos de entrada del usuario, validados por zod.schema
  3.2 ctx: Un objeto que contiene todos los datos de la petición, incluyendo la conexión a la base de datos
4. La función mutation, debe devolver un objeto que cumpla con el tipo de dato de salida de la mutación, en este caso, el tipo de dato de salida de la mutación es un objeto de tipo Topic*/
