require 'net/http'
require 'nokogiri'
require 'json'

OUTPUT_FILE = File.join(__dir__, 'currencies.js')

def extract_currencies
  currencies = []

  currencies_xml = Net::HTTP.get(URI("https://www.currency-iso.org/dam/downloads/lists/list_one.xml"))

  xml = Nokogiri::XML(currencies_xml)

  xml.xpath("//CcyTbl/CcyNtry").each do |path|
    next unless path.at("Ccy")

    currencies << {
      name: path.at("CcyNm").text,
      code: path.at("Ccy").text,
      num: path.at("CcyNbr").text,
      exp: path.at("CcyMnrUnts").text.to_i,
    }
  end

  currencies.uniq.sort{|a,b| a[:num] <=> b[:num] }
end

def js_currency_row(currency)
  "{ name: \"#{currency[:name]}\", code: \"#{currency[:code]}\", num: \"#{currency[:num]}\", exp: #{currency[:exp]} },"
end

def save_currencies(currencies)
  file_content = <<~JAVASCRIPT
  // Updated at: #{Time.now.utc}
  const CURRENCIES = [
    #{currencies.map { |currency| js_currency_row(currency)}.join("\n  ")}
  ];

  export default CURRENCIES;
  JAVASCRIPT

  File.open(OUTPUT_FILE, 'w') do |file|
    file.write(file_content)
  end
end

save_currencies(extract_currencies)
