declare namespace administrative {
  type Province = {
    code: string;
    name: string;
  };

  type City = Province & {
    provinceCode: string;
  };

  type Area = City & {
    cityCode: string;
  };

  type Street = Area & {
    areaCode: string;
  };

  type Village = Street & {
    streetCode: string;
  };
}
