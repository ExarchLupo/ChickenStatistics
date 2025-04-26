using Microsoft.AspNetCore.Mvc;
using Api.DataAccess;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChickensController : ControllerBase
{
    private readonly IChickenRepository _chickenRepository;

    public ChickensController(IChickenRepository chickenRepository)
    {
        _chickenRepository = chickenRepository;
    }

    [HttpGet]
    public async Task<ActionResult<List<ChickenDto>>> GetAll()
    {
        var chickens = await _chickenRepository.GetAllChickensAsync();
        return Ok(chickens);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ChickenDto>> GetById(string id)
    {
        var chicken = await _chickenRepository.GetChickenByIdAsync(id);
        if (chicken == null) return NotFound();
        return Ok(chicken);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] ChickenDto chicken)
    {
        await _chickenRepository.AddChickenAsync(chicken);
        return CreatedAtAction(nameof(GetById), new { id = chicken.Id }, chicken);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(string id, [FromBody] ChickenDto chicken)
    {
        if (id != chicken.Id) return BadRequest();
        await _chickenRepository.UpdateChickenAsync(chicken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(string id)
    {
        await _chickenRepository.DeleteChickenAsync(id);
        return NoContent();
    }

    [HttpPost("{id}/weights")]
    public async Task<ActionResult> AddWeight(string id, [FromBody] ChickenWeightDto weight)
    {
        var chicken = await _chickenRepository.GetChickenByIdAsync(id);
        if (chicken == null) return NotFound();
        chicken.Weights.Add(weight);
        await _chickenRepository.UpdateChickenAsync(chicken);
        return NoContent();
    }
}
