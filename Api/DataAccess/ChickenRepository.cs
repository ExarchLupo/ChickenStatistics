using MongoDB.Driver;

namespace Api.DataAccess;

public class ChickenRepository : IChickenRepository
{
    private readonly IMongoCollection<ChickenDto> _chickens;

    public ChickenRepository(string connectionString, string databaseName, string collectionName)
    {
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);
        _chickens = database.GetCollection<ChickenDto>(collectionName);
    }

    public async Task<List<ChickenDto>> GetAllChickensAsync()
    {
        return await _chickens.Find(_ => true).ToListAsync();
    }

    public async Task<ChickenDto> GetChickenByIdAsync(string id)
    {
        return await _chickens.Find(chicken => chicken.Id == id).FirstOrDefaultAsync();
    }

    public async Task AddChickenAsync(ChickenDto chicken)
    {
        await _chickens.InsertOneAsync(chicken);
    }

    public async Task UpdateChickenAsync(ChickenDto chicken)
    {
        await _chickens.ReplaceOneAsync(c => c.Id == chicken.Id, chicken);
    }

    public async Task DeleteChickenAsync(string id)
    {
        await _chickens.DeleteOneAsync(chicken => chicken.Id == id);
    }
}
