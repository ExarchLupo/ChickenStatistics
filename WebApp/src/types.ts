export interface ChickenWeightDto {
  date: string;
  weight: number;
}

export interface ChickenDto {
  id: string;
  name: string;
  breed: string;
  dateOfBirth: string;
  weights: ChickenWeightDto[];
}
