# Features
- Use .NET 9 and asp.net core for the Api projects
- Use the following structure for the Api project:
  - Api/Controllers/ChickenController.cs
  - Api/Controllers/WeightController.cs
  - Api/Models/ChickenDto.cs
  - Api/Models/ChickenWeightDto.cs
  - Api/DataAccess/IChickenRepository.cs
  - Api/DataAccess/ChickenRepository.cs


- Use these DTO classes for the REST API:
public class ChickenDto
{
public string Id { get; set; }
public string Name { get; set; }
public string Gender { get; set; }
public string Breed { get; set; }
public List<ChickenWeightDto> Weights { get; set; }
public DateTime DateOfBirth { get; set; }
}
public class ChickenWeightDto
{
public string Id { get; set; }
public double Weight { get; set; }
}
- Store the data in a MongoDB and implement the IChickenRepository interface for the access 
