/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/utils/connect";
import ItemCard from "./ItemCard";
import InputForm from "./InputForm";
import { revalidatePath } from "next/cache";

export default async function ClassesAdmin() {
  const classes = (await db.query(`SELECT * FROM classes`)).rows;

  async function handleSubmit(formData: FormData) {
    "use server";

    const { name } = Object.fromEntries(formData);
    const newClass = db.query(`INSERT INTO classes (name) VALUES ($1)`, [name]);
    revalidatePath("/admin");
  }

  async function handleDelete(id: number) {
    "use server";
    const result = db.query("DELETE FROM classes WHERE id = $1 RETURNING *", [
      id,
    ]);
    revalidatePath("/admin");
  }

  return (
    <div className="h-full p-4 border-openblue border-3 rounded-lg m-4 -mb-20">
      <div className="text-3xl text-center py-5">Edit classes</div>
      <div>
        {classes.map((item) => (
          <ItemCard key={item.id} item={item} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="py-5">
        <InputForm handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
