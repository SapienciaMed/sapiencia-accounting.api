import test from "japa";
import { EResponseCodes } from "App/Constants/ResponseCodesEnum";
import BusinessService from "App/Services/BusinessService";
import { BusinessRepositoryFake } from "./FakeClass/BusinessRepositoryFake";
import { ApiResponse } from "App/Utils/ApiResponses";

const service = new BusinessService(new BusinessRepositoryFake());

test.group("RolService TEST for getBusinessById", () => {
  test("class service must have a method getBusinessById with a return", async (assert) => {
    const result = service.getBusinessById(1);
    assert.isNotNull(result);
  });

  test("the method getBusinessById must be a promise", async (assert) => {
    const result = service.getBusinessById(1);
    assert.typeOf(result, "Promise");
  });

  test("the method getBusinessById must return a ApiResponse", async (assert) => {
    const result = await service.getBusinessById(1);
    assert.instanceOf(result, ApiResponse);
  });

  test("the method getBusinessById must return a OK code ", async (assert) => {
    const result = await service.getBusinessById(1);
    assert.isTrue(result.operation.code === EResponseCodes.OK);
  });

  test("the method getBusinessById must return a array", async (assert) => {
    const result = await service.getBusinessById(1);

    assert.isArray(result.data);
  });
});
