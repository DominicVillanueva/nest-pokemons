import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

// export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  nro: number;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
