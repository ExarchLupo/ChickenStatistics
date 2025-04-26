namespace Api.DataAccess;

public interface IChickenRepository
{
    Task<List<ChickenDto>> GetAllChickensAsync();
    Task<ChickenDto> GetChickenByIdAsync(string id);
    Task AddChickenAsync(ChickenDto chicken);
    Task UpdateChickenAsync(ChickenDto chicken);
    Task DeleteChickenAsync(string id);
}
