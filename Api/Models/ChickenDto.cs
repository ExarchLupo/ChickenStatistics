
namespace Api.DataAccess;

public class ChickenDto
{
    public required string Id { get; set; } // MongoDB ObjectId as string
    public string Name { get; set; } = string.Empty;
    public string Breed { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public List<ChickenWeightDto> Weights { get; set; } = new List<ChickenWeightDto>();
}
