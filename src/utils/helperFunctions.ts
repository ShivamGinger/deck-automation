export async function getCompanyName(companyID: string) {
  try {
    const response = await fetch(`/api/companies/${companyID}`);

    if (response.ok) {
      const data = await response.json();

      return data.data[0].name;
    }

  } catch (err) {
    console.log(err);
  }
};

export async function getRoleName(companyID: string, roleID: string) {
  try {
    const response = await fetch(`/api/companies/${companyID}/roles/${roleID}`);

    if (response.ok) {
      const data = await response.json();

      return data.data[0].rname;
    }
  } catch (err) {
    console.log(err);
  }
}