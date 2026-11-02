local lsp = vim.lsp
local root = vim.fn.expand("%:p:h")

lsp.config("tsc", {
	cmd = { "./node_modules/bin/tsc", "--lsp", "--stdio" },
	root_dir = function(_, on_dir)
		on_dir(root)
	end,
	---@type lspconfig.settings.vtsls
	settings = {
		javascript = {
			format = {
				enable = false,
			},
		},
		typescript = {
			format = {
				enable = false,
			},
			preferences = {
				importModuleSpecifier = "shortest",
				importModuleSpecifierEnding = "minimal",
			},
		},
	},
	on_attach = function(client)
		client.server_capabilities.documentFormattingProvider = false
		client.server_capabilities.documentRangeFormattingProvider = false
	end,
} --[[@as vim.lsp.Config]])
