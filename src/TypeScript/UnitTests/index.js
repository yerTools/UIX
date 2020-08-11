test("Build is not older than an hour.", () => {
    expect(new Date(YER_TOOLS_UIX_CONFIGURATION.buildTime).getTime()).toBeGreaterThan(new Date().getTime() - 60 * 60 * 1000);
});